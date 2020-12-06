var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var basketSchema = new Schema({
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
    productList: [
      {
        quantity: Number,
        product:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "products",
        required: true,}
      },
    ],

},
{
    timestamps: true
  });
// basketSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Basket", basketSchema);


