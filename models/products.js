var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var productSchema = new Schema({
    name:String,
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rate: Number,
    image: String,
    creationTime:Date,
    modifictionTime:Date,
    //seller: { type: mongoose.Schema.Types.ObjectID, ref: 'user' },
    countInStock: { type: Number, required: true },
    size:[Number],
    gender:String


});

  

module.exports = mongoose.model("product", productSchema);
