import React from 'react';
import Sidebar, { DrawerHeader } from '../../components/Admin/Sidebar/Sidebar';
import Usertable from '../../components/Admin/Usertable/Usertable';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
	const navigate = useNavigate();

	const adminToken = JSON.parse(localStorage.getItem('admin-auth'));

	useEffect(() => {
		if (!adminToken?.token) {
			navigate('/admin/login');
		}
	}, []);
	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<Sidebar />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />
					<Box sx={{ display: 'flex' }}>
						<h2>Users</h2>
					</Box>
					<Usertable />
				</Box>
			</Box>
		</>
	);
}

export default Dashboard;
