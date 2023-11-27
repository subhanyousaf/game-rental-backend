const {model, Schema} = require("mongoose");

module.exports = model(
    "games",
    new Schema({
        name: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        platform: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        }
    }));