const BaseService = require("./base-service");
const Image= require("../models/images");

class ImageService extends BaseService {
  model = Image;
}

module.exports = new ImageService();