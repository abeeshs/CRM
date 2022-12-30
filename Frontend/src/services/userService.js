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
		
		const res = await axios.get('http://localhost:8000/users',{headers:{"Authorization":`Bearer ${token}`}});
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
