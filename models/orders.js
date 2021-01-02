var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ["ordered", "on the way", "shipped"] },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
  basket: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "baskets",
  },
  adress: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "adresses",
    required: true,
  },
  creditCardNo: Number,
  cvv: Number,
  creditExpirationDate: Date, // date nasıl ona bakın...
});
// basketSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("order", orderSchema);
