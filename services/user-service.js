const BaseService = require("./base-service");
const User = require("../models/users");

class UserService extends BaseService {
  model = User;
}

module.exports = new UserService();