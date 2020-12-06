const express = require("express");
const router = express.Router();

const Basket = require("../services/basket-service");

router.get("/all", async (req, res) => {
  const baskets = await Basket.findAll();
  res.send(baskets);
});

router.get("/:id", async (req, res) => {
  const basket = await Basket.find(req.params.id);
  res.send(basket);
});

router.post("/", async (req, res) => {
  const basket = await Basket.add(req.body);
  res.send(basket);
});

router.delete("/:id", async (req, res) => {
  const basket = await Basket.del(req.params.id);
  res.send(basket);
});

module.exports = router;
