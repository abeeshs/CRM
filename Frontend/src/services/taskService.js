import axios from 'axios';
import { toast } from 'react-toastify';

//get all task- admin
export const getAllTask = async () => {
	try {
		const adminToken = JSON.parse(localStorage.getItem('admin-auth'));
		const token = adminToken.token;
		const res = await axios.get('http://localhost:8000/admin/task', {
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

//create new Task
export const createTask = async (data) => {
	const adminToken = JSON.parse(localStorage.getItem('admin-auth'));
	const token = adminToken.token;

	console.log(token);
	try {
		const res = await axios.post('http://localhost:8000/admin/task/add-task', data, {
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

//All tasks for this user

export const getUserTask = async (token) => {
	try {
		console.log("hii")
		const res = await axios.get('http://localhost:8000/task', {
			headers: { Authorization: `Bearer ${token}` }
		});
		console.log(res);
		return res.data;
	} catch (err) {
		console.log(err)
	}
};

//Change task status for user
export const changeTaskStatus = async (token,status,taskId) => {
	try {
		console.log("hii")
		const res = await axios.put(`http://localhost:8000/task/change-status/${taskId}`,{status}, {
			headers: { Authorization: `Bearer ${token}` }
		});
		console.log(res);
		return res.data;
	} catch (err) {
		console.log(err)
	}
};


//Edit task by admin
export const editTaskAdmin = async (token,data,taskId) => {
	try {
		console.log("hii")
		const res = await axios.put(`http://localhost:8000/admin/task/edit-task/${taskId}`,{data}, {
			headers: { Authorization: `Bearer ${token}` }
		});
		console.log(res);
		return res.data;
	} catch (err) {
		console.log(err)
	}
};


//Delete task by admin
export const deleteTaskAdmin = async (token,taskId) => {
	try {
		
		const res = await axios.delete(`http://localhost:8000/admin/task/delete-task/${taskId}`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		console.log(res);
		return res.data;
	} catch (err) {
		console.log(err)
	}
};


//varify task
export const changeTaskStatusAdmin =async(token,taskId)=>{
	try{
		console.log("object")
		console.log(token)
		const res = await axios.patch(`http://localhost:8000/admin/task/change-status/${taskId}`);
		return res
	}catch(err){
		console.log(err)
	}
}

//pending  task by user
export const getPendingTask = async (token) => {
	try {
		
		const res = await axios.get(`http://localhost:8000/task/pending-task`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		console.log(res);
		return res.data;
	} catch (err) {
		console.log(err)
	}
};

//Compleated  task by user
export const completedTask = async (token) => {
	try {
		
		const res = await axios.get('http://localhost:8000/task/completed-task', {
			headers: { Authorization: `Bearer ${token}` }
		});
		console.log(res);
		return res.data;
	} catch (err) {
		console.log(err)
	}
};

// Upload task documents

export const uploadFile = async (token,data,taskId)=>{
	try{
		const res = await axios.post(`http://localhost:8000/task/upload-file/${taskId}`,data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		console.log(res)
		return res.data

	}catch(err){
		console.log(err)

	}
}