module.exports = class Service {
  async findAll() {
    return this.model.find();
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
  async findCategoryProducts(category) {
    console.log(" hajkahajk" ,category);
    console.log(typeof(category));
    return this.model.find({category:category});
  }
  async findGenderProducts(gender) {
    // 
    console.log(" hajkahajk" ,gender);
    console.log(typeof(gender));
    return this.model.find({gender:gender});
  }
};
