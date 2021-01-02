express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/:id", async (req, res) => {
  const adress = await model.find(req.params.adress);
  res.send(adress);
});
