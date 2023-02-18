import axios from 'axios';

import { toast } from 'react-toastify';

//ciew all users for - admin
export const getAllUser = async () => {
	try {
		const res = await axios.get('http://localhost:8000/admin/users');
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

//view users -for users

export const viwAllusers = async (token) => {
	try {
		const res = await axios.get('http://localhost:8000/users', {
			headers: { Authorization: `Bearer ${token}` }
		});
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

//Block User
export const blockUsers = async (userId, status) => {
	try {
		const admintoken = JSON.parse(localStorage.getItem('admin-auth'));
		console.log(admintoken)
		const token= admintoken.token
		const res = await axios.patch(`http://localhost:8000/admin/Users/block-user/${userId}`,{status})
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

//Delete users
export const deleteUser = async (token, userId) => {
	try {
		const res = await axios.delete(`http://localhost:8000/admin/Users/delete-user/${userId}`, {
			headers: { Authorization: `Bearer ${token}` }
		});
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

export const userLogOut = async () => {
	try {
		const token = JSON.parse(localStorage.getItem('user'));
		console.log(token)
		if (token) {
			localStorage.removeItem('user');

			return true;
		} else {
			return false;
		}
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
