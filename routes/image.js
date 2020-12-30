

express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());

const Image = require("../services/image-service");



router.post("/", async (req, res) => {
    var adress = req.body;
    adress = await Image.add(adress);
    res.send(adress);
  });

 
  
module.exports = router;