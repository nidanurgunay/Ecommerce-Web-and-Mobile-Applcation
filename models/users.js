var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({

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
  creationTime: Date,
  modificationTime: Date
});



module.exports = mongoose.model("user", userSchema);