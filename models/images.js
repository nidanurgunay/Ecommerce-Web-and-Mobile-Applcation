var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var imageSchema = new Schema(
  {
  
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
