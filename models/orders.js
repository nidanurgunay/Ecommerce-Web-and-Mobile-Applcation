var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
  //userAdressId: databasede baglıycaz.
  basket: { type: mongoose.SchemaTypes.ObjectId, ref: "baskets", required: true },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },

  totalPrice: Number, /// total price hesaplama fonksiyonu......
  creditCardNo: Number,
  cvv: Number,
  creditExpirationDate: Number, // date nasıl ona bakın...

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
var orderModel = mongoose.model("Order", orderSchema);

module.exports = basketModel;
