express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
const { response } = require('../app');
const { Console } = require('console');
router.use(bodyParser.json());

let d = new Date();

const JWT_SECRET = 'sdjkfh8923ysgdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

/**********************email */
const mailgun = require("mailgun-js");
const passport = require('passport');
const DOMAIN = 'sandbox387fdc914bd44fb7a7ff7c5cf325a53a.mailgun.org';
const API_KEY = '75ed49265d30f00af00ff7ef24c28fba-360a0b2c-97875b1a'
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });


router.post("/", async (req, res) => {

    const { token } = req.body;

    if (token) {

        jwt.verify(token, JWT_SECRET, async function (err, decodedToken) {

            if (err) {
                return res.status(400).json({ error: "Incorrect or expired link" })
            }

            const { email, password, gender } = decodedToken;
          
            User.findOne({ email }).exec(async (err, user) => {
                if (user) {
                    return res.status(400).json({ error: "Email already exists" });
                }
                
                try {
                   
                    const hashedpassword = await bcrypt.hash(password, 10)
                    const newUser = new User({
                        email: email,
                        gender: gender,
                        password: hashedpassword,
                        creationTime: d,
                        modificationTime: d,
                    });
                  
                    console.log(newUser);
                    await newUser.save().then(() => {
                            res.json({ token: token });
                        }).catch((error) => {
                            res.status(500).send("Kaydetme İşleminde Hata Oluştu.");
                        });

                } catch {
                    res.status(500).send("hataa")
                }
            })
        })

    } else {
        return res.json({ error: "Something went wrong" })
    }
})
module.exports = router;