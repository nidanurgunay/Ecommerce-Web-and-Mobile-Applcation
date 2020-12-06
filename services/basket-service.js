const BaseService = require("./base-service");
const Basket = require("../models/baskets");

class BasketService extends BaseService {
  model = Basket;
}

module.exports = new BasketService();
