express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());
let d = new Date();

// name: "Erkek Bot",
// //seller: req.user._id,
// image: "../images/erkekbot.jpeg",
// price: 30,
// category: "Bot",
// brand: "sample brand",
// countInStock: 0,
// rate: 2,
// description: "sample description",
// countInStock: 10,
// size: [40, 42, 44],
// gender: "erkek",

var Product = require("../services/products-service");

router.get("/all", async (req, res) => {
  var products = await Product.findAll();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  var product = await Product.find(req.params.id);
  res.send(product);
});

router.post("/", async (req, res) => {
  var product = await Product.add(req.body);
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  var product = await Product.del(req.params.id);
  res.send(product);
});

module.exports = router;
