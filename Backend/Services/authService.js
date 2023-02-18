import Otp from '../Model/otpModel.js';
import asyncHandler from 'express-async-handler';

// otp login
export const emailOtpLogin = asyncHandler(async (data) => {
	const optData = await Otp.create(data);

	return optData;
});

// Varify OTP
export const varifyEmailOtp = asyncHandler(async (email) => {
	const otpData = await Otp.findOne({ email: email }).sort({ createdAt: -1 });

	
	if (otpData) {
		return otpData;
	}
	return false;
});
