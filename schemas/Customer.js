const { model, Schema } = require("mongoose");

module.exports = model(
  "customers",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    joinedOn: {
      type: Date,
      default: Date.now,
    },
    lastPurchase: {
      type: Number,
      default: 0,
    },
  })
);
