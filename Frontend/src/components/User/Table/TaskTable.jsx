import React from 'react';
import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Popup from '../Popup/Popup';
import Table from '@mui/material/Table';
import { useState } from 'react';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import TaskViewTable from './TaskViewTable';
import { set } from 'react-hook-form';
function TaskTable(props) {
	const { userTask } = props;
	console.log(userTask);
	const pages = [5, 10, 25];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [openPopup, setOpenPopup] = useState(false);
	const [viewTask,setViewTask]=useState({})

	const handleOpen =(item)=>{
		setViewTask(item);
		setOpenPopup(true)
	}

	return (
		<>
		
		
			<TableContainer>
				<Table sx={{ minWidth: 650 }}>
					<TableHead  sx={{ backgroundColor: 'black', fontWeight: '900' ,fontWeight: 500}}>
						<TableRow sx={{ fontSize: '25px',  }}>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }} >Title</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }}>Task Type</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }}>Created By</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }}>Priority</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }}>Due Date</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }}>Task Status</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }}>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{userTask.map((item) => (
							<TableRow key={item._id}>
								<TableCell>{item.title}</TableCell>
								<TableCell>{item.task_type}</TableCell>
								<TableCell>{item.created_by.firstname}</TableCell>
								<TableCell>{item.priority}</TableCell>
								<TableCell>{item.due_date}</TableCell>
								<TableCell>{item.task_status}</TableCell>
								<TableCell>
									
									<Button variant="outlined" color="secondary" onClick={()=>handleOpen(item)}>
										<OpenInBrowserIcon /> Open
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Popup title={'Task'} openPopup={openPopup} setOpenPopup={setOpenPopup}>
				<TaskViewTable viewTask={viewTask} setViewTask={setViewTask}/>
			</Popup>
		</>
	);
}

export default TaskTable;
