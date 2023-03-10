import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../Model/adminModel.js';
import User from '../Model/userModel.js'

export const adminProtect = asyncHandler(async (req, res, next) => {
	let token;
	
	console.log(req.headers)

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			//get the token
			token = req.headers.authorization.split(' ')[1];
			console.log(token)

			//varify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// console.log(decoded)

			//get admin from the token
			req.user = await Admin.findById(decoded.id).select('-password');
			next();
		} catch (err) {
			console.log(err);
			res.status(401);
			throw new Error('Not authorized');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not authorized ,no token');
	}
});


export const userProtect = asyncHandler(async (req, res, next) => {
	let token;


	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			//get the token
			token = req.headers.authorization.split(' ')[1];
			// console.log(token)

			//varify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// console.log(decoded)

			//get USER from the token
			const user = await User.findById(decoded.id).select('-password');
			console.log("This is the user id from jwt"+user)
			if(user){
				req.user=user;
				next();
			}else{
				throw new Error('')
			}
			
		} catch (err) {
			console.log(err);
			res.status(401);
			throw new Error('Not authorized');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not authorized ,no token');
	}
});