
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
      },

    // email: String,
    // password: String,
    email: {
        type: String,
        required: true,
        minlength: 2,
      },
    
    password: {
        type: String,
        required: true,
        minlength: 2,
      },
});



module.exports = mongoose.model("user", userSchema);