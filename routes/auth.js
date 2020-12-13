express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
var User = require("../models/users");
var jwt = require("jsonwebtoken");
router.use(bodyParser.json());

let d = new Date();

const JWT_SECRET = "sdjkfh8923yssghjadgasjht#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

router.post("/", async (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, JWT_SECRET, async function (err, decodedToken) {
      if (err) {
        return res.json({ status:"error", error: "Incorrect or expired link" });
      }

      const { email, password, gender } = decodedToken;

      User.findOne({ email }).exec(async (err, user) => {
        if (user) {
          return res.json({ status:"error",error: "Email already exists" });
        }

        try {
          const hashedpassword = await bcrypt.hash(password, 10);
          const newUser = new User({
            email: email,
            gender: gender,
            password: hashedpassword,
          });
          const token2 = jwt.sign({ email, password, gender }, JWT_SECRET, { expiresIn: "40m" });
          console.log(newUser);
          await newUser
            .save()
            .then(() => {
              res.json({message:"verified", token: token2 });
            })
            .catch((error) => {
              res.status(500).send("Kaydetme İşleminde Hata Oluştu.");
            });
        } catch {
          res.status(500).send("hataa");
        }
      });
    });
  } else {
    return res.json({ error: "Something went wrong" });
  }
});
module.exports = router;
