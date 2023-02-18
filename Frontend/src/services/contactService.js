import axios from 'axios';
import { useTransition } from 'react';
import { toast } from 'react-toastify';

//get All contacts -User

export const getAllContact = async () => {
	const userToken = JSON.parse(localStorage.getItem('user'));
	const token = userToken?.token;

	try {
		const res = await axios.get('http://localhost:8000/contacts', {
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

//create contact
export const createContact = async (data) => {
	try {
		console.log({data})
		const userToken = JSON.parse(localStorage.getItem('user'));
		
		const token = userToken?.token;
		const res = await axios.post('http://localhost:8000/contacts/add-contact', {data}, {
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

//Update contact -USER
export const updateContact = async (data) => {
	try {
		console.log("data")
		console.log(data._id)
		console.log(data)
		const userToken = JSON.parse(localStorage.getItem('user'));
		const token = userToken.token;
		const res = await axios.put(`http://localhost:8000/contacts/edit-contact/${data._id}`, data, {
			headers: { Authorization: `Bearer ${token}` }
		});
		console.log(res);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

//get All contact admin
export const getAllContactAdmin = async (token) => {
	

	try {
		const res = await axios.get('http://localhost:8000/admin/contacts', {
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

//Delete contact by user
export const deleteContact =async (id)=>{
	try {
		const res = await axios.get('http://localhost:8000/contacts/delete-contact');
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
}