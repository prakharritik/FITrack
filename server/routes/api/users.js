const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { check, validationResult } = require("express-validator");

const router = express.Router();

const User = require("../../models/User");
const sendEmail = require("../../utilities/tokenSender");

/*
    Type : Post
    To Register User.
*/

router.post(
  "/signup",
  [
    check("name", "Name is required.").notEmpty(),
    check("email", "E-Mail is required.").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password should be of at least 6 characters.").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: "User already exists." }] });
      }

      user = new User({
        email,
        name,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      user.save();

      payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          try {
            sendEmail(email, name, token);
          } catch (err) {
            throw err;
          }
        }
      );

      res.json({
        success: [
          {
            message: "Successfully registered. Verify your email to login.",
          },
        ],
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error.");
    }
  }
);

/*
    Type : Get
    To Verify User.
*/

router.get("/verify/:token", (req, res) => {
  const { token } = req.params;

  // Verifing the JWT token
  jwt.verify(token, process.env.jwtSecret, async function (err, decoded) {
    if (err) {
      console.log(err);
      res.send(
        "Email verification failed, possibly the link is invalid or expired"
      );
    } else {
      let user = await User.findOne({ _id: decoded.user.id });
      try {
        user.emailVerified = true;
        user.save();
        res.send("Email verified successfully");
      } catch (error) {
        return res.status(500).send("Server Error.");
      }
    }
  });
});

module.exports = router;
