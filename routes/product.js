express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());



var Product = require("../services/products-service");

router.get("/all", async (req, res) => {
  var products = await Product.findAll();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  var product = await Product.find(req.params.id);
  res.send(product);
});

router.get("/filter", async (req, res) => {
  console.log("iiii")
  var product = await Product.sort();
  res.send(product);
});
router.get("/category/:category", async (req, res) => {
  var product = await Product.findCategoryProducts(req.params.category);
  res.send(product);
});

router.get("/gender/:gender", async (req, res) => {
  var product = await Product.findGenderProducts(req.params.gender);
  res.send(product);
});

router.get("/gender/:gender/category/:category", async (req, res) => {
  var product = await Product.findCategoryGenderProducts(req.params.category,req.params.gender);
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
