import axios from 'axios';
import { toast } from 'react-toastify';

export const adminLogout = async () => {
	try {
		const adminToken = JSON.parse(localStorage.getItem('admin-auth'));
		if (adminToken) {
            const token = adminToken.token;
			const res = await axios.get('http://localhost:8000/admin/logout', {
				headers: { Authorization: `Bearer ${token}` }
			});
			console.log(res.data);
			if (res.data.logout) {
				localStorage.removeItem('admin-auth');
				return res.data;
			}
			return res.data;
		}else{
           toast.error('Please login again')
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
