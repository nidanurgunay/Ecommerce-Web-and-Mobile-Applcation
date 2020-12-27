const { response } = require("express");

module.exports = class Service {
  async findAll() {
    return this.model.find();
  }

 
  async sort() {
    console.log("sorttayım")
  
     this.model.find().sort({rate: 1}).toArray(function(err, result){
      if (err) throw err;      
      else 
      return result;

    });
  }

  async add(item) {
    return this.model.create(item);
  }

  async del(itemId) {
    return this.model.remove({ _id: itemId });
  }

  async find(itemId) {
    return this.model.findById(itemId);
  }

  async findCategoryProducts(Category) {
    return this.model.find({category:Category});
  }
  
  async findCategoryGenderProducts(Category, Gender) {
    return this.model.find({category:Category, gender:Gender});
  }

  async findGenderProducts(gender) {
    return this.model.find({gender:gender});
  }
};
