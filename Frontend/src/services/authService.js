import axios from 'axios';
import {toast} from 'react-toastify'



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