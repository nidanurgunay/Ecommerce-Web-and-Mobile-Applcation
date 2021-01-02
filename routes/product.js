express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './public/images');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });

var Product = require("../services/products-service");
// const Product1 = require("../models/product");
router.get("/all", async (req, res) => {
  var products = await Product.findAll();
  res.send(products);
});
//searching
router.get("/all/search/:what", async (req, res) => {
  var products = await Product.searchAll(req.params.what);
  res.send(products);
});
router.get("/category/:category/search/:what", async (req, res) => {
  var product = await Product.searchCategoryProducts(req.params.category, req.params.what);
  res.send(product);
});
router.get("/gender/:gender/search/:what", async (req, res) => {
  var product = await Product.searchGenderProducts(req.params.gender, req.params.what);
  res.send(product);
});
router.get("/gender/:gender/category/:category/search/:what", async (req, res) => {
  var product = await Product.searchCategoryGenderProducts(req.params.category, req.params.gender, req.params.what);
  res.send(product);
});

//sorting
router.get("/all/price/:what", async (req, res) => {
  var products = await Product.sortAllprice(req.params.what);
  res.send(products);
});
router.get("/all/rate/:what", async (req, res) => {
  var products = await Product.sortAllrate(req.params.what);
  res.send(products);
});

router.get("/category/:category/rate/:what", async (req, res) => {
  var product = await Product.findCategoryProductsrate(req.params.category, req.params.what);
  res.send(product);
});
router.get("/category/:category/price/:what", async (req, res) => {
  var product = await Product.findCategoryProductsprice(req.params.category, req.params.what);
  res.send(product);
});
router.get("/gender/:gender/price/:what", async (req, res) => {
  var product = await Product.findGenderProductsprice(req.params.gender, req.params.what);
  res.send(product);
});
router.get("/gender/:gender/rate/:what", async (req, res) => {
  var product = await Product.findGenderProductsrate(req.params.gender, req.params.what);
  res.send(product);
});
router.get("/gender/:gender", async (req, res) => {
  var product = await Product.findGenderProducts(req.params.gender);
  res.send(product);
});

router.get("/gender/:gender/category/:category/rate/:what", async (req, res) => {
  var product = await Product.findCategoryGenderProductsrate(req.params.category, req.params.gender, req.params.what);
  res.send(product);
});
router.get("/gender/:gender/category/:category/price/:what", async (req, res) => {
  var product = await Product.findCategoryGenderProductsprice(req.params.category, req.params.gender, req.params.what);
  res.send(product);
});

router.get("/:id", async (req, res) => {
  var product = await Product.find(req.params.id);
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
  var product = await Product.findCategoryGenderProducts(req.params.category, req.params.gender);
  res.send(product);
});

router.post("/", async (req, res) => {
  var product = await Product.add(req.body);
  res.send(product);
});

router.put("/:id", async (req, res) => {
  var product = await Product.find(req.params.id);
  product.name = req.body.name;
  product.size = req.body.size;
  product.brand = req.body.brand;
  product.category = req.body.category;
  product.description = req.body.description;
  product.gender = req.body.gender;

  console.log(req.body);
  console.log(product);
  var product1 = await Product.add(product);
  res.send(product1);
});

router.delete("/:id", async (req, res) => {
  var product = await Product.del(req.params.id);
  res.send(product);
});

module.exports = router;
