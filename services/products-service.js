const BaseService = require("./base-service");
const Product = require("../models/products");

class ProductService extends BaseService {
 
  model = Product;
}

module.exports = new ProductService();
