import asyncHandler from 'express-async-handler';
import User from '../Model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

//------------- userSignup---------
//Method - POST
export const userRegister = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { username, email, mobile, password, confirmPassword } = req.body;

	if (!username || !email || !mobile || !password || !confirmPassword) {
		res.status(400);
		throw new Error('all fields required');
	}
	//check email or user already exist

	const emailExist = await User.findOne({ email: email });

	if (emailExist) {
		res.status(404);
		throw new Error('email already exist');
	} else {
		//password bcrypt
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const userDetails = {
			username,
			email,
			mobile,
			password: hashedPassword
		};
		//inserting user data to database
		const user = await User.create(userDetails);
		if (user) {
			res.status(201).json({
				name: user.username,
				email: user.email,
				token: generateToken(user._id)
			});
		} else {
			res.status(400);
			throw new Error('Invalid userdata');
		}
	}
});


//---------------userLogin----------
//method-POST
export const userLogin = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error('All fields required');
	} else {
		const userExist = await User.findOne({ email: email });
		if (userExist && (await bcrypt.compare(req.body.password, userExist.password))) {
			res.status(200).json({ message: 'Loggin Success', token: generateToken(userExist._id) });
		} else {
			res.status(401);
			throw new Error('Incorrect email or password');
		}
	}
});

export const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d'
	});
};
