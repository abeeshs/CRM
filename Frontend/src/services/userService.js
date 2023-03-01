import axios from 'axios';
import { toast } from 'react-toastify';

//--------------- View all users for - admin ---------------

export const getAllUser = async () => {
	try {
		const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/users`);
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

//--------------- View users -for users ----------------

export const viwAllusers = async (token) => {
	try {
		const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
			headers: { Authorization: `Bearer ${token}` }
		});
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

//--------------- Block User ---------------

export const blockUsers = async (userId, status) => {
	try {
		const admintoken = JSON.parse(localStorage.getItem('admin-auth'));
		const token = admintoken.token;
		const res = await axios.patch(
			`${process.env.REACT_APP_SERVER_URL}/admin/Users/block-user/${userId}`,
			{ status }
		);
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

//--------------- Delete users ---------------

export const deleteUser = async (token, userId) => {
	try {
		const res = await axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/admin/Users/delete-user/${userId}`,
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
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
//--------------- User logout service ---------------

export const userLogOut = async () => {
	try {
		const token = JSON.parse(localStorage.getItem('user'));
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
