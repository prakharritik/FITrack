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
    check("item", "Item is required.").notEmpty(),
    check("count", "Count should be a number.").isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { count, item } = req.body;

      const calorie = new Calorie({
        user: req.user.id,
        item,
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

const calculateSum = (calories) => {
  let sum = 0;
  calories.forEach((element) => {
    sum = sum + element.count;
  });
  return sum;
};

router.get("/", async (req, res) => {
  var d = new Date();
  d.setHours(0, 0, 0);
  try {
    let calories = await Calorie.find({
      user: req.user.id,
      date: { $gte: new Date(d) },
    });
    let sum = calculateSum(calories);
    console.log({ calories, sum });
    return res.json({ calories, sum });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error.");
  }
});

module.exports = router;
