const BaseService = require("./base-service");
const Order = require("../models/orders");

class OrderService extends BaseService {
  model = Order;
}

module.exports = new OrderService();
