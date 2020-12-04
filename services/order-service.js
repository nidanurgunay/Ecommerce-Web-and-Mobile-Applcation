const BaseService = require("./base-service");
const Basket = require("../models/order");

class OrderService extends BaseService {
  model = Order;
}

module.exports = new OrderService();
