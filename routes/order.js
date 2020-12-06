express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());
let d = new Date();

var Order = require("../services/products-service");

router.get("/all", async (req, res) => {
  var orders = await Order.findAll();
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  var order = await Order.find(req.params.id);
  res.send(order);
});

router.post("/", async (req, res) => {
  var order = await Order.add(req.body);
  res.send(order);
});

router.delete("/:id", async (req, res) => {
  var order = await Order.del(req.params.id);
  res.send(order);
});

module.exports = router;
