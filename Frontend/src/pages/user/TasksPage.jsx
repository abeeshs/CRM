import { Avatar, Box, Divider, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/User/Sidebar/Sidebar';
import TaskTable from '../../components/User/Table/TaskTable';
import * as taskService from '../../services/taskService';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import PendingTaskTable from '../../components/User/Table/PendingTaskTable';
import { useSelector } from 'react-redux';
import Header from '../../components/User/Header/Header';
import { Container } from '@mui/system';

function TasksPage() {
	const [userTask, setUserTask] = useState([]);

	const [tableType, setTableType] = useState('');
	const { token } = useSelector((state) => state.userAuth);

	console.log('token');
	console.log(token);

	const getTask = async () => {
		console.log('first');
		
		const response = await taskService.getUserTask(token);
		console.log('response');
		console.log(response);
		setUserTask(response);
	};

	const pendingTask = async () => {
		try {
			const response = taskService.getPendingTask(token);
		} catch (err) {}
	};
	useEffect(() => {
		getTask();
	}, []);

	return (
		<div>
			<Header />
			<Container maxWidth="xl">
				
			<h3 style={{fontFamily:'Garamond'}}>All Task</h3>
			<Divider/>
			</Container>
			
			
			
			<Container maxWidth="xl" sx={{marginTop:'50px'}}>
			
				<TaskTable userTask={userTask} />
			</Container>
			
		</div>
	);
}

export default TasksPage;
{
	/* <TaskTable userTask={userTask} /> */
}
{/* <Box sx={{ display: 'flex' }}> */}
				{/* <Sidebar tableType={tableType} setTableType={setTableType}/> */}

				<h3>Tasks</h3>
				{/* <Box
					component="main"
					sx={{
						flexGrow: 1,
						bgcolor: 'background.default',
						marginTop: '50px',
						marginRight: '15px'
					}}>
					<TaskTable userTask={userTask} />
				</Box> */}
			{/* </Box> */}