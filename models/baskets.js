var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var basketSchema = new Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
    productList: [
      {
        quantity: Number, //37DEN 3 MÜ 5 Mİ
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "products",
          required: true,
          // autopopulate: {
          //   maxDepth: 1,
          // },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
//basketSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Basket", basketSchema);
