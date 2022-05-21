const express = require("express");
const requireAuth = require("../../middleware/requireAuth");
const { check, validationResult } = require("express-validator");

const Post = require("../../models/Post");
require("../../models/User");

const router = express.Router();

const cloudinary = require("cloudinary").v2;

const { cloud_name, api_key, api_secret } = process.env;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

router.use(requireAuth);

router.post(
  "/",
  [
    check("title", "Title is required.").notEmpty(),
    check("text", "Text is required.").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const { title, text, image } = req.body;
      const post = new Post({
        user: req.user.id,
        text,
        title,
      });

      if (image) {
        const result = await cloudinary.uploader.upload(image, {
          folder: "fitness",
        });

        post.image = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }

      await post.save();

      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error.");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    let posts = await Post.find().sort({ date: -1 }).populate("user", "name");

    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.put(
  "/",
  [
    check("id", "Post id is required.").notEmpty(),
    check("title", "Title is required.").notEmpty(),
    check("text", "Text is required.").notEmpty(),
  ],
  async (req, res) => {
    try {
      let post = await Post.findById(req.body.id);
      const { text, title, image } = req.body;

      if (!post) {
        return res.status(400).json({ msg: "Post not found" });
      }

      if (post.user.valueOf() !== req.user.id) {
        return res.status(400).json({ msg: "Cannot edit others post." });
      }

      if (image) {
        const result = await cloudinary.uploader.upload(image, {
          folder: "fitness",
        });

        post = Post.findByIdAndUpdate(
          { _id: req.body.id },
          {
            title,
            text,
            image: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
          (err, docs) => {
            if (err) throw err;
            res.json(docs);
          }
        );
      } else {
        Post.findByIdAndUpdate(
          { _id: req.body.id },
          { title, text },
          (err, docs) => {
            if (err) throw err;
            console.log(docs);
            res.json(docs);
          }
        );
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error.");
    }
  }
);

router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/unlike/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check  user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router;
