require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");

const app = express();
const games = require("./routes/games");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/games", games);
require("./startup/prod")(app);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.error("Could not connect to database...", err));

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}...`)
);
