const express = require("express");
const { check, validationResult } = require("express-validator");
const requireAuth = require("../../middleware/requireAuth");

const Profile = require("../../models/Profile");

const router = express.Router();

router.use(requireAuth);

router.post(
  "/",
  [
    check("name", "Name is required.").notEmpty(),
    check("age", "Age is required.").notEmpty(),
    check("height", "Height is required.").notEmpty(),
    check("weight", "Weight is required.").notEmpty(),
    check("age", "Age should be a number.").isInt({ min: 0 }),
    check("height", "Height should be a number.").isInt({ min: 0 }),
    check("weight", "Weight should be a number.").isInt({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { age, name, weight, height } = req.body;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      const profilefields = {
        age,
        name,
        weight,
        height,
        user: req.user.id,
      };

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefields },
          { new: true }
        );
      } else {
        profile = new Profile(profilefields);
        await profile.save();
      }

      return res.json(profile);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error.");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: "There is no profile for this user." }] });
    }

    return res.json(profile);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error.");
  }
});

module.exports = router;
