const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

const router = express.Router();

/*
    Type : Post
    To SignIn User.
*/

router.post(
  "/signin",
  [
    check("email", "E-Mail is required.").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password should be of at least 6 characters.").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = bcrypt.compare(user.password, password);

      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
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
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;