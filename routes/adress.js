const express = require("express");
const { serializeUser } = require("passport");
const router = express.Router();

const Adress = require("../services/adress-service");

router.get("/all", async (req, res) => {
    const adresses = await Adress.findAll();
    res.send(adresses);
  });

router.get("/:id", async (req, res) => {
    const adress = await Adress.find(req.params.id);
    res.send(adress);
});


router.post("/", async (req, res) => {
    var adress = req.body;
    var Adress = await Adress.add(adress);
    res.send(Adress);
  });

  router.put("/:Id", async (req, res) => {
    var newadress = req.body.newadress;
    var adress = await Adress.find(req.params.Id);
    adress.adress=nrewadress.adress;
    Adress.add(adress);
    res.send(adress);
   
  });

  router.delete("/:id", async (req, res) => {
    const adress = await Adress.del(req.params.id);
    res.send(adress);
  });
  
  module.exports = router;