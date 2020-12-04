var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 2,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 2,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
