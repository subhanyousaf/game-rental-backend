const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
const Game = require("../schemas/Game");
const Joi = require("joi");

router.get("/", async (req, res) => {
    const search = req.query.search;

    let query = {};
    if (search) {
        query.name = {$regex: new RegExp(search, 'i')};
    }

    const games = await Game.find(query).sort("name");
    return res.send(games);
});

router.get("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send("Invalid ID.");

    const search = req.query.search;

    const game = await Game.findOne({_id: req.params.id});
    if (!game) return res.status(404).send("The game with the given ID was not found.");

    return res.send(game);
});

router.post("/", async (req, res) => {
    const {error} = validateGame(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const game = new Game({
        name: req.body.name,
        genre: req.body.genre,
        platform: req.body.platform,
        price: req.body.price,
        releaseDate: req.body.releaseDate,
        stock: req.body.stock
    });

    await game.save();
    return res.send(game);
});

router.put("/:id", async (req, res) => {
    const {error} = validateGame(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const game = await Game.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        genre: req.body.genre,
        platform: req.body.platform,
        price: req.body.price,
        releaseDate: req.body.releaseDate,
        stock: req.body.stock
    }, {new: true});

    if (!game) return res.status(404).send("The game with the given ID was not found.");
    return res.send(game);
});

router.delete("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send("Invalid ID.");

    const game = await Game.findOneAndDelete({_id: req.params.id});
    if (!game) return res.status(404).send("The game with the given ID was not found.");

    return res.send(game);
});

function validateGame(game) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        genre: Joi.string().min(3).required(),
        platform: Joi.string().min(2).required(),
        price: Joi.number().min(0).required(),
        releaseDate: Joi.date().required(),
        stock: Joi.number().min(0).required()
    });
    return schema.validate(game);
}

module.exports = router;