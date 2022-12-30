import { Avatar, Box, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/User/Sidebar/Sidebar';
import TaskTable from '../../components/User/Table/TaskTable';
import * as taskService from '../../services/taskService';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { useSelector } from 'react-redux';
function TasksPage() {
	const [userTask, setUserTask] = useState([]);
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
	useEffect(() => {
		getTask();
	}, []);

	return (
		<div>
			<Box sx={{ backgroundColor: 'White', width: '100%', height: '65px' }}>
				<Avatar
					sx={{ float: 'right', margin: '10px', marginRight: '30px' }}
					alt="Travis Howard"
					src="/static/images/avatar/2.jpg"
				/>
				<CircleNotificationsIcon
					sx={{
						float: 'right',
						margin: '15px',
						color: 'grey',
						fontSize: '30px',
						marginRight: '30px'
					}}
				/>
			</Box>
			<Box sx={{ display: 'flex' }}>
				<Sidebar />

				<h3>Tasks</h3>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						bgcolor: 'background.default',
						marginTop: '50px',
						marginRight: '15px'
					}}>
					<TaskTable userTask={userTask} />
				</Box>
			</Box>
		</div>
	);
}

export default TasksPage;
{
	/* <TaskTable userTask={userTask} /> */
}
