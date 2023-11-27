const express = require('express');
const router = express.Router();

const Joi = require("joi");

const genres = [
    {id: 1, name: "action"},
    {id: 2, name: "adventure"},
    {id: 3, name: "multiplayer"},
    {id: 4, name: "rpg"},
    {id: 5, name: "shooter"},
    {id: 6, name: "simulation"},
    {id: 7, name: "sports"},
    {id: 8, name: "strategy"},
    {id: 9, name: "survival"},
    {id: 10, name: "other"}
]

router.get("/", (req, res) => {
    return res.send(genres);
});


router.get("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with the given ID was not found.");
    return res.send(genre);
});

router.post("/", (req, res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    return res.send(genre);
});

router.put("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with the given ID was not found.");

    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    return res.send(genre);
});

router.delete("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with the given ID was not found.");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    return res.send(genre);
});

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

module.exports = router;