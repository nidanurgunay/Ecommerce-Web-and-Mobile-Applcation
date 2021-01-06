express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());

var User=require("../services/user-service");

router.get("/:id", async (req, res) => {
  const user = await User.find(req.params.id);
  res.send(user);
});

module.exports = router;