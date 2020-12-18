const BaseService = require("./base-service");
const Adress = require("../models/adresses");

class AdressService extends BaseService {
  model = Adress;
}

module.exports = new AdressService();