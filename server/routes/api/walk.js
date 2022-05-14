const express = require("express");
const requireAuth = require("../../middleware/requireAuth");

const Walk = require("../../models/Walk");

const router = express.Router();

router.use(requireAuth);

function distanceBetweenPoints(lat1, lat2, lon1, lon2) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  let r = 6371;

  return c * r;
}

router.post("/", async (req, res) => {
  const { locations } = req.body;

  if (!locations || locations.length <= 1) return res.send("Empty");
  try {
    let distance = 0;

    for (let index = 0; index < locations.length - 1; index++) {
      const element = locations[index].coords;
      const nextelement = locations[index + 1].coords;

      distance += distanceBetweenPoints(
        element.latitude,
        nextelement.latitude,
        element.longitude,
        nextelement.longitude
      );
    }

    const walk = new Walk({
      user: req.user.id,
      distance,
    });

    await walk.save();

    return res.json(walk);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error.");
  }
});

router.get("/", async (req, res) => {
  try {
    let walks = await Walk.find({ user: req.user.id });
    return res.json(walks);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error.");
  }
});

module.exports = router;
