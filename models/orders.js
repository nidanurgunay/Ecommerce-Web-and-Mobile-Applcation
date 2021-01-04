var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
  email:String,
  status:{type:String,
    enum: ['ordered', 'on the way', 'shipped']},
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },

  basket: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "baskets",
  },
  address: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "addresses",
  },
  creditCardNo: Number,
  cvv: Number,
  creditExpirationDate:String, // date nasıl ona bakın...


} ,{ timestamps: true });
module.exports = mongoose.model("order", orderSchema);

