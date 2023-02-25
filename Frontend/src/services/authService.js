import axios from 'axios';
import { toast } from 'react-toastify';

//admin register
export const adminRegister = async (data) => {
	console.log({ data });
	try {
		const res = await axios.post('http://localhost:8000/admin/signup', data);
		console.log(res);
		return res.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		toast(message, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark'
		});
	}
};

//admin login
export const adminLogin = async (data) => {
	console.log({ data });
	try {
		const res = await axios.post('http://localhost:8000/admin', data);
		console.log(res.data);
		return res.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		toast(message, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark'
		});
	}
};

//User login
export const userLogin = async (data) => {
	console.log({ data });
	try {
		const res = await axios.post('http://localhost:8000', data);
		console.log(res);
		return res.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		toast(message, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark'
		});
	}
};

//User register
export const userRegister = async (data) => {
	console.log({ data });
	try {
		const res = await axios.post('http://localhost:8000/signup', data);
		console.log(res);
		return res.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		toast(message, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark'
		});
	}
};

//User OTP Login
export const userOtpLogin = async (data) => {
	try {
		const res = await axios.post('http://localhost:8000/otp-login', data);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const userVerifyOTP = async (otp, email) => {
	try {
		const res = await axios.post('http://localhost:8000/varify-otp', { otp, email });
		return res.data;
	} catch (err) {
		console.log(err.response.data);
		return err.response.data;
	}
};
export const userLogout = async () => {
	try {
		localStorage.removeItem('user');
		return true;
	} catch (err) {
		console.log(err);
	}
};
