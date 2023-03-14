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
	console.log(userTask);

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
				<h3 style={{ fontFamily: 'Garamond' }}>All Task</h3>
				<Divider />
			</Container>

			<Container maxWidth="xl" sx={{ marginTop: '50px' }}>
				{userTask?.length > 0 ? (
					<TaskTable userTask={userTask} />
				) : (
					<div style={{display:'flex', justifyContent:'space-evenly',alignItems:'center'}}>
						<img src="/images/empty.jpg" style={{ width: '400px',height:'400px' }} alt="" />
						<h2 className='commen-font' style={{fontWeight:'800',}}>No tasks yet</h2>
					</div>
				)}
			</Container>
		</div>
	);
}

export default TasksPage;
