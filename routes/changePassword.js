express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var User = require('../models/users');
var jwt = require('jsonwebtoken');
const passport = require('passport');
router.use(bodyParser.json());


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
			console.log(" ompare")
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
			res.json({ status: 'passwordChanged' ,token:token})
			// return res.json({ status: "ok", token: token, isProductManager: user.isProductManager, isSalesManager:user.isSalesManager, email:email, message: "valid", userid:user._id });
		} res.json({ status: "error", error: "Invalid Oldpassword" });

	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}

	// 		const { email, password, gender } = decodedToken;
	// 		const user = await User.findOne({ email }).lean();
	// 		if (await bcrypt.compare(password, oldpassword)) {
	// 			const token2 = jwt.sign(
	// 				{
	// 				  id: user._id,
	// 				  email: user.email,
	// 				  password: user.password,
	// 				},
	// 				JWT_SECRET,
	// 				{ expiresIn: "1h" }
	// 			  );
	// 			  return res.json({ status: "ok", token: token, isProductManager: user.isProductManager, isSalesManager:user.isSalesManager, email:email, message: "valid", userid:user._id });

	// 		}



	// 		User.findOne({ email }).exec(async (err, user) => {
	// 		  if (user) {
	// 			return res.json({ status:"error", error: "Incorrect or expired link" });
	// 		  }try {
	// 			const hashedoldpassword = await bcrypt.hash(password, 10);




	// 			)
	//     console.log(user)
	// 	const _id = user.id
	// 	token.jwt.verify
	// 	const npassword = await bcrypt.hash(plainTextPassword, 10)

	//     console.log(npassword);
	// 	await User.findByIdAndUpdate(
	// 		{ _id },

	// 		{ "password": npassword} 


	// 	)
	// 	res.json({ status: 'ok' })
	// } catch (error) {
	// 	console.log(error)
	// 	res.json({ status: 'error', error: ';))' })
	// }
})
module.exports = router;