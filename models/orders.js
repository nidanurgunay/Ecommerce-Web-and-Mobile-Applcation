var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
  basket: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "baskets",
  },
  adress: {
    type: {
      country: String,
      city: String,
      streetName: String,
      Other: String,
      zipCode: String
    },
    required: true
  },
  creditCardNo: Number,
  cvv: Number,
  creditExpirationDate: Date, // date nasıl ona bakın...

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
module.exports = mongoose.model("order", orderSchema);

