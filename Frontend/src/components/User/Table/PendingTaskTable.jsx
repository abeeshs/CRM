import React, { useEffect } from 'react';
import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Popup from '../Popup/Popup';
import Table from '@mui/material/Table';
import { useState } from 'react';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import TaskViewTable from './TaskViewTable';
import * as taskService from '../../../services/taskService';
import { useSelector } from 'react-redux';

function PendingTaskTable() {
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [openPopup, setOpenPopup] = useState(false);
	const [viewTask, setViewTask] = useState({});
	const [pendingTask, setPendingTask] = useState([]);

	const { token } = useSelector((state) => state.userAuth);
	useEffect(() => {
		getPendingTask();
	}, []);
	const getPendingTask = async () => {
		try {
			const response = await taskService.getPendingTask(token);
			if (response) {
				setPendingTask(response);
			} else {
				console.log('Pending task empty');
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleOpen = (item) => {
		setViewTask(item);
		setOpenPopup(true);
	};

	return (
		<>
			<TableContainer>
				<Table sx={{ minWidth: 650 }}>
					<TableHead sx={{ backgroundColor: 'black' }}>
						<TableRow sx={{ fontSize: '25px', fontWeight: 500 }}>
							<TableCell sx={{ color: 'white' }}>Title</TableCell>
							<TableCell sx={{ color: 'white' }}>Task Type</TableCell>
							<TableCell sx={{ color: 'white' }}>Created By</TableCell>
							<TableCell sx={{ color: 'white' }}>Priority</TableCell>
							<TableCell sx={{ color: 'white' }}>Due Date</TableCell>
							<TableCell sx={{ color: 'white' }}>Task Status</TableCell>
							<TableCell sx={{ color: 'white' }}>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{pendingTask.map((item) => (
							<TableRow key={item._id}>
								<TableCell>{item.title}</TableCell>
								<TableCell>{item.task_type}</TableCell>
								<TableCell>{item.created_by.firstname}</TableCell>
								<TableCell>{item.priority}</TableCell>
								<TableCell>{item.due_date}</TableCell>
								<TableCell>{item.task_status}</TableCell>
								<TableCell>
									<Button variant="outlined" color="secondary" onClick={() => handleOpen(item)}>
										<OpenInBrowserIcon /> Open
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Popup title={'Task'} openPopup={openPopup} setOpenPopup={setOpenPopup}>
				<TaskViewTable viewTask={viewTask} setViewTask={setViewTask} />
			</Popup>
		</>
	);
}

export default PendingTaskTable;
