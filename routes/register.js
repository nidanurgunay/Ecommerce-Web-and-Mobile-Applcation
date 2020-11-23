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

router.post("/", async (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then( async (user) => {
            if (user) {
                return res.status(400).json({ email: "Email already exists" });
            } else {
                console.log("req body:  ", req.body);
                const { email: e_mail, password: plainPassword, gender: gen } = req.body;

                if (!plainPassword || typeof plainPassword !== 'string') {
                    return res.json({ status: 'error', error: 'Invalid password' })
                }

                if (plainPassword.length < 7) {
                    return res.json({
                        status: 'error',
                        error: 'Password too small. Should be atleast 6 characters'
                    })
                }

               
                console.log("size ", plainPassword.length, "type  ", typeof plainPassword);

                try {
                   
                    const hashedpassword= await bcrypt.hash(plainPassword,10)
                    console.log(hashedpassword)

                    
                    const user = new User({
                        email: e_mail,
                        gender: gen,
                        password: hashedpassword,
                        creationTime: d.getUTCDate(),
                        modificationTime: d.getUTCDate(),
                    });
                    const token = jwt.sign({ user }, JWT_SECRET);

                    await user.save().then(() => {
                        res.json({ token: token });
                    }).catch((err) => {
                        res.json("Kaydetme İşleminde Hata Oluştu.", err.code);
                    });
                }catch {
                    res.status(500).send("hataa")
                }
            }


        })






    
});





module.exports = router;