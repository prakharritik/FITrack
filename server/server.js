const express = require("express");
const connectDB = require("./db/mongoose");

const app = express();

connectDB();

const port = process.env.PORT || 8000;

app.use(express.json({ extended: false, limit: "4mb" }));
app.use("/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/auth"));
app.use("/profile", require("./routes/api/profile"));
app.use("/walk", require("./routes/api/walk"));
app.use("/post", require("./routes/api/post"));
app.use("/calorie", require("./routes/api/calorie"));

app.get("/", (req, res) => {
  res.send("Welcome to Fitness Pro API");
});
app.listen(port, () => {
  console.log("App running on port", port);
});
