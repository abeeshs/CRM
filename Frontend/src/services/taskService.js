import axios from "axios";
import {toast} from 'react-toastify'

//get all task- admin
export const getAllTask = async () => {
	const adminToken =JSON.parse(localStorage.getItem('admin-auth')) 
	const token=adminToken.token;
	
	try {
		const res = await axios.get('http://localhost:8000/admin/task',{headers:{"Authorization":`Bearer ${token}`}});
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

//create new Task
export const createTask = async (data) => {
	const adminToken =JSON.parse(localStorage.getItem('admin-auth')) 
	const token=adminToken.token;
	console.log(token)
	try {
		const res = await axios.post('http://localhost:8000/admin/task/add-task',data,{headers:{"Authorization":`Bearer ${token}`}});
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
