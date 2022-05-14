const express = require("express");
const requireAuth = require("../../middleware/requireAuth");
const { check, validationResult } = require("express-validator");

const Sleep = require("../../models/Sleep");

const router = express.Router();

router.use(requireAuth);

router.post(
  "/",
  [
    check("duration", "Duration is required.").notEmpty(),
    check("duration", "Duration should be a number.").isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { duration } = req.body;

      const sleep = new Sleep({
        user: req.user.id,
        duration,
      });

      await sleep.save();

      return res.json(sleep);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error.");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    let sleeps = await Sleep.find({ user: req.user.id });
    return res.json(sleeps);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error.");
  }
});

module.exports = router;
