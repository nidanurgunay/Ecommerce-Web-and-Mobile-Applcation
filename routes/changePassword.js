express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var User = require('../models/users');
var jwt = require('jsonwebtoken');
router.use(bodyParser.json());


const JWT_SECRET = 'sdjkfh8923ysgdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


router.post('/', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body
	console.log(token, plainTextPassword);
	
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 8) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 7 characters'
		})
	}
	
	try {
		const user = jwt.verify(token, JWT_SECRET)
        console.log(user)
		const _id = user.id
		const npassword = await bcrypt.hash(plainTextPassword, 10)
        var d = new Date();
        console.log(npassword);
		await User.findByIdAndUpdate(
			{ _id },
			
			{ "password": npassword, modificationDate: d} 
                 
			
			
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})
module.exports = router;