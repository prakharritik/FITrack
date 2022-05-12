const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.jwtSecret, async (err, decoded) => {
    if (err) return res.status(401).send({ error: "Invalid token" });
    const {
      user: { id },
    } = decoded;
    const user = await User.findById(id).select("-password");
    req.user = user;
    next();
  });
};
