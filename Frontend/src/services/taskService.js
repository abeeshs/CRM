import axios from 'axios';
import { toast } from 'react-toastify';

//--------------- Get all task- admin ---------------

export const getAllTask = async () => {
	try {
		const adminToken = JSON.parse(localStorage.getItem('admin-auth'));
		const token = adminToken.token;
		const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/task`, {
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

//--------------- Create new Task ---------------

export const createTask = async (data) => {
	const adminToken = JSON.parse(localStorage.getItem('admin-auth'));
	const token = adminToken.token;
	try {
		const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/task/add-task`, data, {
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

//--------------- All tasks for this user ---------------

export const getUserTask = async (token) => {
	try {
		const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/task`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

//--------------- Change task status for user ---------------

export const changeTaskStatus = async (token, status, taskId) => {
	try {
		const res = await axios.put(
			`${process.env.REACT_APP_SERVER_URL}/task/change-status/${taskId}`,
			{ status },
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

//--------------- Edit task by admin ---------------

export const editTaskAdmin = async (token, data, taskId) => {
	try {
		const res = await axios.put(
			`${process.env.REACT_APP_SERVER_URL}/admin/task/edit-task/${taskId}`,
			{ data },
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

// --------------- Delete task by admin ---------------

export const deleteTaskAdmin = async (token, taskId) => {
	try {
		const res = await axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/admin/task/delete-task/${taskId}`,
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

//--------------- Varify task ---------------

export const changeTaskStatusAdmin = async (token, taskId) => {
	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_SERVER_URL}/admin/task/change-status/${taskId}`
		);
		return res;
	} catch (err) {
		console.log(err);
	}
};

//--------------- Pending  task by user ---------------

export const getPendingTask = async (token) => {
	try {
		const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/task/pending-task`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

//--------------- Compleated  task by user ---------------

export const completedTask = async (token) => {
	try {
		const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/task/completed-task`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

//--------------- Upload task documents ---------------

export const uploadFile = async (token, data, taskId) => {
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/task/upload-file/${taskId}`,
			data,
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};
