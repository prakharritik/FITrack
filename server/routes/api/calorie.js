const express = require("express");
const requireAuth = require("../../middleware/requireAuth");
const { check, validationResult } = require("express-validator");

const Calorie = require("../../models/Calorie");

const router = express.Router();

router.use(requireAuth);

router.post(
  "/",
  [
    check("count", "Count is required.").notEmpty(),
    check("count", "Count should be a number.").isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { count } = req.body;

      const calorie = new Calorie({
        user: req.user.id,
        count,
      });

      await calorie.save();

      return res.json(calorie);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error.");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    let calories = await Calorie.find({ user: req.user.id });
    return res.json(calories);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error.");
  }
});

module.exports = router;
