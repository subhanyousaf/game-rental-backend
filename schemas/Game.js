const { array } = require("joi");
const { model, Schema } = require("mongoose");

module.exports = model(
  "games",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    genres: {
      type: Array,
      required: true,
    },
    platforms: {
      type: Array,
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
    },
    gameArtUrl: {
      type: String,
      required: true,
    },
    criticScore: {
      type: Number,
      default: 0,
    },
  })
);
