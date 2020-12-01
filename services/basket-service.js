const BaseService = require("./base-service");
const Basket = require("../models/basket");

class BasketService extends BaseService {
  model = Basket;
}

module.exports = new BasketService();
