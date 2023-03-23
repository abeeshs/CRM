import asyncHandler from 'express-async-handler';
import User from '../Model/userModel.js';
import * as authService from '../Services/authService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

//------------- userSignup---------
//Method - POST

export const userRegister = asyncHandler(async (req, res) => {
	const { username, email, mobile, password, confirmPassword } = req.body;

	if (!username || !email || !mobile || !password || !confirmPassword) {
		res.status(400);
		throw new Error('All fields required');
	}
	//check email or user already exist

	const emailExist = await User.findOne({ email: email });

	if (emailExist) {
		res.status(404);
		throw new Error('Email already exists');
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
				user: user,
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
	const { email, password } = req.body;
	console.log(req.body);
	console.log('1');
	if (!email || !password) {
		res.status(400);
		throw new Error('All fields required');
	} else {
		const userExist = await User.findOne({ email: email }).select('+password');
		console.log(userExist);
		if (userExist && (await bcrypt.compare(req.body.password, userExist.password))) {
			if (userExist.is_block) {
				console.log('2');
				res.status(401);
				throw new Error('Temporarly blocked by admin');
			} else {
				console.log('3');
				res.status(200).json({
					message: 'Loggin Success',
					token: generateToken(userExist._id),
					user: userExist
				});
			}
		} else {
			console.log('4');
			res.status(401);
			throw new Error('Incorrect email or password');
		}
	}
});

//--------------- otp Login ----------------
//method-POST
//NODE MAILER SETUP

export const otpLogin = asyncHandler(async (req, res) => {
	const { email } = req.body;
	if (!email) {
		res.status(400);
		throw new Error('Please enter Email');
	} else {
		const userExist = await User.findOne({ email: email });
		if (!userExist) {
			res.status(400).json({ message: 'email not exist' });
			//throw new Error('user not exist');
		} else {
			//Creating random otp number
			const OTP = Math.floor(1000 + Math.random() * 9000).toString();

			//configuring nodemailer sender data
			const config = {
				service: 'gmail',
				auth: {
					user: process.env.EMAIL,
					pass: process.env.PASSWORD
				}
			};

			// create reusable transporter object using the default SMTP transport
			let transporter = nodemailer.createTransport(config);

			// Using mailgen creating a better mail format
			const MailGenerator = new Mailgen({
				theme: 'default',
				product: {
					name: 'CRM',
					link: 'https://mailgen.js/'
				}
			});

			const response = {
				body: {
					intro: `Enter ${OTP} to varify your email address and sign in to your account`
				}
			};

			const mail = MailGenerator.generate(response);

			const message = {
				from: process.env.EMAIL, // sender address
				to: email, // list of receivers
				subject: 'OTP for login', // Subject line
				html: mail
			};

			// sending mail
			const result = await transporter.sendMail(message);

			//storing the otp details
			const otpDetails = {
				email: email,
				otp: OTP
			};

			//inserting otp details to the database
			const insertedData = await authService.emailOtpLogin(otpDetails);
			if (insertedData) {
				res.status(200).json({
					message: 'Mail send successfully',
					info: result.messageId,
					preview: nodemailer.getTestMessageUrl(result)
				});
			} else {
				res.status(404);
				throw new Error('Failed to sent otp');
			}
		}
	}
});

//---------------- varify otp and do singin ----------------

export const varifyOtp = asyncHandler(async (req, res) => {
	const { otp, email } = req.body;
	const otpDetails = await authService.varifyEmailOtp(email);
	const existOtp = otpDetails?.otp;
	if (existOtp == otp) {
		const userExist = await User.findOne({ email: email });
		if (userExist?.is_block) {
			res.status(401);
			throw new Error('Temporarly blocked by admin');
		} else {
			res.status(200).json({
				message: 'Loggin Success',
				token: generateToken(userExist._id),
				username: userExist.username
			});
		}
	} else {
		throw new Error('Incorrect otp');
	}
});

//--------------User Logout-------------
//Method - GET

export const userLogOut = async () => {
	try {
	} catch (err) {
		console.log(err);
	}
};

//--------- Generate jwt Token ----------------
export const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d'
	});
};

//---------------- view all users ----------------

export const viewAllUser = asyncHandler(async (req, res) => {
	const users = await User.find();
	console.log({ users });
	if (users) {
		res.status(200).json({ status: 'Success', users });
	} else {
		res.status(400);
		throw new Error('Users not found');
	}
});

//---------------- Get Profile ----------------

export const getProfile = asyncHandler(async (req, res) => {
	const user = await User.findOne({ _id: req.user._id });
	console.log({ user });
	if (user) {
		res.status(200).json({ status: 'Success', user });
	} else {
		res.status(400);
		throw new Error('User not found');
	}
});


export const editProfile = asyncHandler(async (req, res) => {
	const userId =req.user._id 
	const data= req.body
	console.log(data)

	const user = await User.findByIdAndUpdate(userId,data);
	console.log({ user });
	if (user) {
		res.status(200).json({ status: 'Success', user });
	} else {
		res.status(400);
		throw new Error('User not found');
	}
});