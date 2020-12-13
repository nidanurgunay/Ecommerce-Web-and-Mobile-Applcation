express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/users');
var jwt = require('jsonwebtoken');

router.use(bodyParser.json());

let d = new Date();

const JWT_SECRET = 'sdjkfh8923yssghjadgasjht#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


const mailgun = require("mailgun-js");
const passport = require('passport');
const DOMAIN = 'sandbox387fdc914bd44fb7a7ff7c5cf325a53a.mailgun.org';
const API_KEY = '75ed49265d30f00af00ff7ef24c28fba-360a0b2c-97875b1a'
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });



router.post("/", async (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then(async (user) => {
            if (user) {
                return res.json({ status:'error', error: "Email already exists" });
            } else {

                const { email, password, gender } = req.body;

                if (!password || typeof password !== 'string') {
                    return res.json({ status: 'error', error: 'Invalid password' })
                }

                if (password.length < 7) {
                    return res.json({
                        status: 'error',
                        error: 'Password too small. Should be atleast 7 characters'
                    })
                }

                try {

                    const token = jwt.sign({ email, password, gender }, JWT_SECRET, { expiresIn: '40m' });
                    console.log("token::", token)
                    const CLIENT_URL = 'http://localhost:5002'
                    const data = {
                        from: 'noreply@ecommerce.com',
                        to: email,
                        subject: 'Account Activation Link',
                        html: `
             <h2>Please copy and paste this token to activate your account</h2>
             <p> ${token} </p>
     
     `
                    };
                    mg.messages().send(data, function (error, body) {
                        if (error) {
                            return res.json({
                                message: error.message
                            })
                        }
                        return res.status(200).json({ message: 'Email has been send', token: token });

                    });

                } catch {
                    res.status(500).send("hataa")
                }
            }
        })
});

module.exports = router;

