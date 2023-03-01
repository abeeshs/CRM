import Otp from '../Model/otpModel.js';
import asyncHandler from 'express-async-handler';
import Admin from '../Model/adminModel.js'

// otp login
export const emailOtpLogin = asyncHandler(async (data) => {
	const optData = await Otp.create(data);

	return optData;
});

// Varify OTP
export const varifyEmailOtp = asyncHandler(async (email) => {
	const otpData = await Otp.findOne({ email: email }).sort({ createdAt: -1 });
	console.log(otpData)

	
	if (otpData) {
		return otpData;
	}
	return false;
});

export const getAdminDetails =asyncHandler(async(id)=>{
	const result = await Admin.findById(id)
	console.log(result)
	return result
})