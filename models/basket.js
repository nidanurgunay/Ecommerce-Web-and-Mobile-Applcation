var mongoose = require("mongoose");
var basketSchema = new mongoose.Schema({
  user: String,

  //   users: {
  //     type: mongoose.SchemaTypes.ObjectId,
  //     ref: "users",
  //     required: true,
  //     //   autopopulate: {
  //     //     maxDepth: 2,
  //     //     select: "-myOrders"S
  //     // }
  //   },
  //   productList: [
  //     {
  //       quantity: Number,
  //       type: mongoose.SchemaTypes.ObjectId,
  //       ref: "products",
  //       required: true,
  //       autopopulate: {
  //         maxDepth: 2,
  //       },
  //     },
  //   ],
});
// basketSchema.plugin(require("mongoose-autopopulate"));
var basketModel = mongoose.model("Basket", basketSchema);

module.exports = basketModel;
