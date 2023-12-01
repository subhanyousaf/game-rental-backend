const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Customer = require("../schemas/Customer");
const Joi = require("joi");

router.get("/", async (req, res) => {
  const search = req.query.search;

  let query = {};
  if (search) {
    query.name = { $regex: new RegExp(search, "i") };
  }

  const customers = (await Customer.find(query)).reverse();
  return res.send(customers);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");

  const customer = await Customer.findOne({ _id: req.params.id });
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  return res.send(customer.response);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingCustomerCheck = await Customer.findOne({
    email: req.body.email,
  });
  if (existingCustomerCheck)
    return res.status(400).send("This email belongs to another customer.");

  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  await customer.save();
  return res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  return res.send(customer);
});

router.delete("/:id", async (req, res) => {
  setTimeout(async () => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).send("Invalid ID.");

    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");

    return res.send(customer);
  }, 5000);
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    joinedOn: Joi.date().default(Date.now()),
    lastPurchase: Joi.date().default(0),
  });

  return schema.validate(customer);
}

module.exports = router;
