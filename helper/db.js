
var mongoose = require("mongoose");

module.exports = () => {
  
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ecommerce12345:ecommerce12345@cluster0.oc33o.mongodb.net/ecommerce?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("testmongodb").collection("user");
  // perform actions on the collection object
  client.close();
});
}