
express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/users');
var jwt = require('jsonwebtoken');

let d = new Date();

const JWT_SECRET = 'sdjkfh8923ysgdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

router.post("/", async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body
    const user = await User.findOne({ email }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid email/password' })
    }

    if (await bcrypt.compare(password, user.password)) {

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                password:user.password            
            },
            JWT_SECRET, {expiresIn:'1h'}
        )

        return res.json({ status: 'ok', token: token , email })
    }

    res.json({ status: 'error', error: 'Invalid username/password' })
});


module.exports = router;