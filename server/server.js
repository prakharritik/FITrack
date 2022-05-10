const express = require("express");
const connectDB = require("./db/mongoose");

const app = express();

connectDB();

const port = process.env.PORT || 8000;

app.use(express.json({ extended: false }));
app.use("/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/auth"));

app.get("/", (req, res) => {
  res.send("Welcome to Fitness Pro API");
});
app.listen(port, () => {
  console.log("App running on port", port);
});
