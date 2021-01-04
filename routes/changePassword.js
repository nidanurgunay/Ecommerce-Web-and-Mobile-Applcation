express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var User = require('../models/users');
var jwt = require('jsonwebtoken');
const passport = require('passport');
router.use(bodyParser.json());
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox387fdc914bd44fb7a7ff7c5cf325a53a.mailgun.org';
const API_KEY = '75ed49265d30f00af00ff7ef24c28fba-360a0b2c-97875b1a'
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

const JWT_SECRET = 'sdjkfh8923ysgdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';


router.post('/', async (req, res) => {
	const { token, newpassword: plainTextPassword, oldpassword: oldpasswords, email } = req.body
	console.log(token, plainTextPassword);
	console.log("old", oldpasswords);
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 7) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 7 characters'
		})
	}
	console.log("email", email)

	try {
		console.log("trydaym")
		const user = await User.findOne({ email }).lean();
		console.log(user)
		if (!user) {
			console.log("errr")
			return res.json({ status: "error", error: "Invalid email/password" });
		}
		else if (await bcrypt.compare(oldpasswords, user.password)) {

			const npassword = await bcrypt.hash(plainTextPassword, 10)
			const _id = user._id;
			console.log(npassword);
			await User.findByIdAndUpdate(
				{ _id },

				{ "password": npassword }
			)

			const token = jwt.sign(
				{
					id: user._id,
					email: user.email,
					password: npassword,
					isProductManager: user.isProductManager,
					isSalesManager: user.isSalesManager,
				},
				JWT_SECRET,
				{ expiresIn: "1h" }
			);



			const CLIENT_URL = 'http://localhost:5002'
			const data = {
				from: 'noreply@ecommerce.com',
				to: user.email,
				subject: 'Friendyol Password Change',
				html: `
				<h2>This is an email for you to inform that you have recently changed your password</h2>
  
		`

			};
			mg.messages().send(data, function (error, body) {
				if (error) {
					return res.json({
						message: error.message
					})
				}
				return res.status(200).json({ message: 'PasswordChange Email has been send' });

			});
			res.json({ status: 'passwordChanged', token: token })

			// return res.json({ status: "ok", token: token, isProductManager: user.isProductManager, isSalesManager:user.isSalesManager, email:email, message: "valid", userid:user._id });
		} res.json({ status: "error", error: "Invalid Oldpassword" });

	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}


})
module.exports = router;