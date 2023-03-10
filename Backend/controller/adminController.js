import Admin from '../Model/adminModel.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../Model/userModel.js';
import Tasks from '../Model/taskModel.js';
import *as authService from '../Services/authService.js'
//-------------Admin Register-------------
//method = POST
export const adminRegister = asyncHandler(async (req, res) => {
	console.log('object');
	console.log(req.body);
	const { firstname, lastname, email, mobile, password, confirmPassword } = req.body;

	if (!firstname || !lastname || !email || !mobile || !password || !confirmPassword) {
		console.log('........');
		res.status(400);
		throw new Error('All fields required');
	}
	//check email or admin already exist

	const emailExist = await Admin.findOne({ email: email });

	if (emailExist) {
		res.status(404);
		throw new Error('Email already exist');
	} else {
		//password bcrypt
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const adminDetails = {
			firstname,
			lastname,
			email,
			mobile,
			password: hashedPassword
		};
		//inserting admin data to database
		const admin = await Admin.create(adminDetails);
		if (admin) {
			res.status(201).json({
				name: admin.firstname,
				email: admin.email,
				token: generateToken(admin._id)
			});
		} else {
			res.status(400);
			throw new Error('Invalid userdata');
		}
	}
});

//-------------Admin Login--------------
//method =POST

export const adminLogin = asyncHandler(async (req, res) => {
	console.log(req.body);

	if (!req.body.email || !req.body.password) {
		res.status(401);
		throw new Error('All fields required');
	} else {
		//check the admin exist
		const adminData = await Admin.findOne({ email: req.body.email });

		if (adminData && (await bcrypt.compare(req.body.password, adminData.password))) {
			res.status(200).json({ message: 'Loggin Success', token: generateToken(adminData._id) });
		} else {
			res.status(401);
			throw new Error('Incorrect email or password');
		}
	}
});

//-------------Admin Logout--------------
//method =POST

export const logOut = asyncHandler(async (req, res) => {
	res.status(200).json({ logout: true, message: 'Logout Success' });
});

//-------------Create New User------------
//Method -POST
export const createUser = asyncHandler(async (req, res) => {
	console.log(req.body);
	const email = req.body.email;
	if (!email) {
		res.status(400);
		throw new Error('Please enter email');
	} else {
		const user = await User.findOne({ email: email });

		if (user) {
			res.status(401);
			throw new Error('Email already exist');
		} else {
			const newUser = await User.create({ email: email });
			console.log(newUser);
			res.status(200).json({ message: 'User created successfully' });
		}
	}
});

//----------  DELETE USER--------------
//Method -POST
export const deleteUser = asyncHandler(async (req, res) => {
	const userId = req.params.id;
	const users = await User.findByIdAndDelete(userId);
	console.log(users);
	if (users) {
		res.status(200).json(users);
	} else {
		res.status(400);
		throw new Error('Users not found');
	}
});

//------------GET ALL USER----------------
//Method -GET

export const getAllUser = asyncHandler(async (req, res) => {
	const users = await User.find();

	if (users) {
		res.status(200).json(users);
	} else {
		res.status(400);
		throw new Error('Users not found');
	}
});

//-------------GET ALL TASK----------------
//Method -GET

export const getAllTask = asyncHandler(async (req, res) => {
	const task = await Tasks.find()
	console.log(task);
	if (task) {
		res.status(200).json(task);
	} else {
		res.status(200);
		throw new Error('Tasks not found');
	}
});

//------------GET ALL USER----------------
//Method -GET

export const blockUser = asyncHandler(async (req, res) => {
	const userId = req.params.id;
	console.log(req.body);
	const updatedUser = await User.findByIdAndUpdate(userId, { is_block: req.body.status });
	console.log(updatedUser);

	if (updatedUser) {
		res.status(200).json({ message: 'User blocked' });
	} else {
		res.status(400);
		throw new Error('Users not found');
	}
});

export const getProfile= asyncHandler(async(req,res)=>{
	const adminData=await authService.getAdminDetails(req.user._id)
	console.log(adminData)
	if(adminData){
		res.status(200).json(adminData)
	}else{
		throw new Error("Unable to find admin details")
	}
})
//------------JWT token generate-----------
export const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d'
	});
};
