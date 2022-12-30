import React, { useEffect } from 'react';


import { Box } from '@mui/material';
import Sidebar, { DrawerHeader } from '../../components/Admin/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminTaskTable from '../../components/Admin/TaskTable/AminTaskTable';
function Tasks() {
	const navigate = useNavigate();
	const {token}  = useSelector((state) => state.adminAuth);
	useEffect(() => {
		if (token) {
     
		} else {
			navigate('/admin/login');
		}
	}, [token]);

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<Sidebar />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />
					<AdminTaskTable />
				</Box>
			</Box>
		</>
	);
}

export default Tasks;
