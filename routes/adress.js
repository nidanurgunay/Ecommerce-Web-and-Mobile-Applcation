const express = require("express");
const { serializeUser } = require("passport");
const router = express.Router();

const Adress = require("../services/adress-service");
var User=require("../services/user-service");

router.get("/all", async (req, res) => {
    const adresses = await Adress.findAll();
    res.send(adresses);
  });

router.get("/:id", async (req, res) => {
    const adress = await Adress.find(req.params.id);
    console.log("adress", adress);
    res.send(adress);
});


router.post("/", async (req, res) => {
    var adress = req.body;
    console.log(adress)
    var aadress = await Adress.add(adress);
    console.log(aadress)
    var aadressId= aadress._id;
    var user = await User.find(req.body.user)
    user.adressId=aadressId;
    await User.add(user);
    res.send(aadress);
  });

  router.put("/:Id", async (req, res) => {
    console.log(req.body)
    var newadress = req.body.newadress;
    var adress = await Adress.find(req.params.Id);
    adress.adress=newadress;
    Adress.add(adress);
    res.send(adress);
   
  });

  router.delete("/:id/:user", async (req, res) => {
   
  
    // var user = await User.find(req.params.user)
    // user = user.toObject();
    // delete user.adressID;
    
    const adress = await Adress.del(req.params.id);
    // user=await User.add(user);

    res.send(adress);
  });
  
  module.exports = router;