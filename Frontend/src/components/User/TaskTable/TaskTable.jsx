import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import * as taskService from '../../../services/taskService';
import Button from '@mui/material/Button';
import './TaskTable.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import *as userService from '../../../services/userService'
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';


const columns = [
	{ field: 'slNo', headerName: 'NO', width: 100 },
	{ field: 'task_status', headerName: 'Status', width: 200 },
	{ field: 'title', headerName: 'Title', width: 200 },
	{ field: '', headerName: 'Associated Contact', width: 200 },
	{ field: 'task_type', headerName: 'Task Type', width: 200 },
	{ field: 'priority', headerName: 'Priority', width: 200 },
	{ field: 'due_date', headerName: 'Due Date', width: 200 },
	{ field: 'Delete', headerName: 'Options', width: 200 }
];

export default function Tasks() {
	const [rows, setRows] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [deleteTask, setDeleteTask]=useState(false)

	const [newTask, setNewTask] = useState({
		title: '',
		type: '',
		associated: '',
		assignedTo: '',
		priority: '',
		dueDate: '',
		time: '',
		description: ''
	});
	const { title, priority, dueDate, type, associated, assignedTo, time, description } = newTask;
	//onchange
	const onchange = (e) => {
		setNewTask((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}));
	};

	//modal
	const [open, setOpen] = useState(false);
	//userData
	const [users,setUsers]=useState([])

	const handleClickOpen = async() => {
		setOpen(true);
		//get user data to display in input field
		const userData=await userService.getAllUser();
		console.log(userData)
		if(userData){
			setUsers(userData);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	//calling function to get all tasks
	const getAllTasks = async () => {
		const response = await taskService.getAllTask();

		console.log(response);
		if (response) {
			setRows(
				response.map((item, index) => {
					item.id = item._id;
					item.slNo = index + 1;
					return item;
				})
			);
		}
	};

	useEffect(() => {
		getAllTasks();
	}, []);

	//-------Creating new task

	const createTask =async (e) => {
		e.preventDefault();
		console.log(newTask);
		const data=await taskService.createTask(newTask)
		handleClose();
		getAllTasks();
	};

	return (
		<div style={{ height: 400, width: '100%' }}>
			<Button className="create-task-btn" variant="contained" onClick={handleClickOpen}>
				Create Task
			</Button>
			<h2>Task</h2>		
			
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{'Create Task'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<form onSubmit={(e) => createTask(e)}>
							<TextField
								id="outlined-basic"
								className="outlined-basic1"
								label="Title *"
								variant="outlined"
								name="title"
								value={title}
								onChange={onchange}
							/>
							<InputLabel id="demo-simple-select-autowidth-label" style={{marginLeft:"10px"}}>Type</InputLabel>
							<Select sx={{ m: 1, minWidth: 280 }}
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={type}
								onChange={onchange}
								autoWidth
								name="type"
								>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={'To-do'}>To-do</MenuItem>
								<MenuItem value={'Call'}>Call</MenuItem>
								<MenuItem value={'Email'}>Email</MenuItem>
							</Select>
							
							<InputLabel id="demo-simple-select-autowidth-label" style={{marginLeft:"10px"}}>Priority</InputLabel>
							<Select sx={{ m: 1, minWidth: 280 }}
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={priority}
								onChange={onchange}
								name='priority'
								autoWidth
								>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={'Low'}>Low</MenuItem>
								<MenuItem value={'Medium'}>Medium</MenuItem>
								<MenuItem value={'High'}>High</MenuItem>
							</Select>
							
							<TextField
								id="outlined-basic"
								className="outlined-basic1"
								label="Associated with records"
								variant="outlined"
								name="associated"
								value={associated}
								onChange={onchange}
							/>
							{/* <TextField
								id="outlined-basic"
								className="outlined-basic"
								label="Assigned to"
								variant="outlined"
								name="assignedTo"
								value={assignedTo}
								onChange={onchange}
							/> */}
							<InputLabel id="demo-simple-select-autowidth-label" style={{marginLeft:"10px"}}>Assigned to</InputLabel>
							<Select sx={{ m: 1, minWidth: 280 }}
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={assignedTo}
								onChange={onchange}
								name='assignedTo'
								autoWidth
								>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{users.map((user)=>{
									return(
									<MenuItem  value={user._id}>{user.username}</MenuItem>
									)
								})}
								{/* <MenuItem value={'Low'}>Low</MenuItem>
								<MenuItem value={'Medium'}>Medium</MenuItem>
								<MenuItem value={'High'}>High</MenuItem> */}
							</Select>
							<InputLabel id="demo-simple-select-autowidth-label" style={{marginLeft:"10px"}}>Due Date</InputLabel>
							<TextField
								id="outlined-basic"
								className="outlined-basic"
								
								variant="outlined"
								type='date'
								name="dueDate"
								value={dueDate}
								onChange={onchange}
							/>
							<TextField
								id="outlined-basic"
								className="outlined-basic"
								label="Time"
								type='time'
								variant="outlined"
								name="time"
								value={time}
								onChange={onchange}
							/>
							<TextField
								name="description"
								id="outlined-basic"
								className="note"
								label="Note *"
								variant="outlined"
								value={description}
								onChange={onchange}
							/>

							<Button type="submit" className="create-task-btn" variant="contained" autoFocus>
								Create
							</Button>
						</form>
					</DialogContentText>
					<Button onClick={handleClose}>Close</Button>
				</DialogContent>
				<DialogActions></DialogActions>
			</Dialog>
		</div>
	);
}

function Priority() {
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 280 }}>
				<InputLabel id="demo-simple-select-autowidth-label">Priority</InputLabel>
				<Select
					labelId="demo-simple-select-autowidth-label"
					id="demo-simple-select-autowidth"
					value={age}
					onChange={handleChange}
					autoWidth
					label="Age">
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={'Low'}>Low</MenuItem>
					<MenuItem value={'Medium'}>Medium</MenuItem>
					<MenuItem value={'High'}>High</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}

function Type() {
	const [type, setType] = React.useState('');

	const handleChange = (event) => {
		setType(event.target.value);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 280 }}>
				<InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
				<Select
					labelId="demo-simple-select-autowidth-label"
					id="demo-simple-select-autowidth"
					value={type}
					onChange={handleChange}
					autoWidth
					label="Type">
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={'To-do'}>To-do</MenuItem>
					<MenuItem value={'Call'}>Call</MenuItem>
					<MenuItem value={'Email'}>Email</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
