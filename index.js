const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const config = require('./config');

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
app.use(morgan('tiny'));
app.use("/api/genres", genres);
app.use("/api/games", games);
require("./startup/prod")(app);

mongoose.connect(config.DB_URL)
    .then(() => console.log("Connected to database..."))
    .catch(err => console.error("Could not connect to database...", err));

app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}...`));