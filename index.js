require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const games = require('./routes/games');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/games", games);
require("./startup/prod")(app);

mongoose.connect("mongodb://127.0.0.1:27017/game-rental")
    .then(() => console.log("Connected to database..."))
    .catch(err => console.error("Could not connect to database...", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));