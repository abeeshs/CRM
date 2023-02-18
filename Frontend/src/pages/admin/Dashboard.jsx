import React from 'react';
import Header from '../../components/Admin/Header/Header';
import Sidebar,{ DrawerHeader } from '../../components/Admin/Sidebar/Sidebar';
import Usertable from '../../components/Admin/Usertable/Usertable';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dashboard() {
	const navigate=useNavigate();

	// const token  = useSelector((state) => state.adminAuth);
	const adminToken = JSON.parse(localStorage.getItem('admin-auth'));
	
	console.log("ithu tiken")
	
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
					<Box sx={{display:'flex'}}>
						<h2>Users</h2>
					</Box>
					<Usertable />
				</Box>
			</Box>
		</>
	);
}

export default Dashboard;
