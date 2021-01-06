const { response } = require("express");

module.exports = class Service {

  async findAll() {
    return this.model.find();
  }
  //search all
  async searchAll(m) {
    return this.model.find(({ description: { '$regex': m, '$options': 'i' } }));
  }
  //sort all
  async sortAllrate(What) {

    return this.model.find().sort({ rate: What });
  }
  async sortAllprice(What) {
    return this.model.find().sort({ newprice: What });
  }

  async add(item) {
    return this.model.create(item);
  }

  async del(itemId) {
    return this.model.deleteOne({ _id: itemId });
  }

  async find(itemId) {
    return this.model.findById(itemId);
  }



  async findCategoryProducts(Category) {
    return this.model.find({ category: Category });
  }
  async findCategoryProductsrate(Category, What) {
    return this.model.find({ category: Category }).sort({ rate: What });
  }
  async findCategoryProductsprice(Category, What) {
    return this.model.find({ category: Category }).sort({ newprice: What });
  }
  async searchCategoryProducts(Category, m) {
    return this.model.find(({ category: Category, description: { '$regex': m, '$options': 'i' } }));
  }
  async findGenderProducts(gender) {
    return this.model.find({ gender: gender });
  }
  async findGenderProductsprice(gender, What) {
    return this.model.find({ gender: gender }).sort({ rate: What });
  }
  async findGenderProductsrate(gender, What) {
    return this.model.find({ gender: gender }).sort({ newprice: What });
  }
  async searchGenderProducts(Gender, m) {
    return this.model.find(({ gender: Gender, description: { '$regex': m, '$options': 'i' } }));
  }



  async findCategoryGenderProducts(Category, Gender) {
    return this.model.find({ category: Category, gender: Gender });
  }
  async findCategoryGenderProductsrate(Category, Gender, What) {
    console.log(What)
    return this.model.find({ category: Category, gender: Gender }).sort({ rate: What });
  }
  async findCategoryGenderProductsprice(Category, Gender, What) {
    console.log(What)
    return this.model.find({ category: Category, gender: Gender }).sort({ newprice: What });
  }
  async searchCategoryGenderProducts(Category, Gender, m) {
    return this.model.find(({ category: Category, gender: Gender, description: { '$regex': m, '$options': 'i' } }));
  }

  async findprevOrder(userId) {
    return this.model.find({ user: userId});
  }
};
