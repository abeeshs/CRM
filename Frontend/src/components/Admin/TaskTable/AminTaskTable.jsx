import * as React from 'react';
import { useState, useEffect } from 'react';
import * as taskService from '../../../services/taskService';
import Button from '@mui/material/Button';
import './AdminTaskTable.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import * as userService from '../../../services/userService';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Popup from '../../User/Popup/Popup';
import EditTaskForm from '../AdminForm/TaskForm/EditTaskForm';
import * as contactService from '../../../services/contactService';
import { useSelector } from 'react-redux';
import DeleteModal from '../../Extra Components/DeleteModal';

// const columns = [
// 	{ field: 'slNo', headerName: 'NO', width: 100 },
// 	{ field: 'task_status', headerName: 'Status', width: 200 },
// 	{ field: 'title', headerName: 'Title', width: 200 },
// 	{ field: '', headerName: 'Associated Contact', width: 200 },
// 	{ field: 'task_type', headerName: 'Task Type', width: 200 },
// 	{ field: 'priority', headerName: 'Priority', width: 200 },
// 	{ field: 'due_date', headerName: 'Due Date', width: 200 },

// ];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


export default function AdminTaskTable() {
	const [rows, setRows] = useState([]);
	const [deleteTask, setDeleteTask] = useState('');
	const [tasks, setTasks] = useState([]);
	const [editTask, setEditTask] = useState({});
	const [openPopup, setOpenPopup] = useState(false);
	const [allContacts, setAllContacts] = useState([]);
	const [openModal,setOpenModal]=useState(false)

	//modal state
	const [open, setOpen] = useState(false);
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

	//userData
	const [users, setUsers] = useState([]);
	const { token } = useSelector((state) => state.adminAuth);
	const handleClickOpen = async () => {
		setOpen(true);
		//get user data to display in input field
		const userData = await userService.getAllUser();
		
		console.log(userData);
		if (userData) {
			setUsers(userData);
			
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	//calling function to get all tasks
	const getAllTasks = async () => {
		const response = await taskService.getAllTask();
		const contacts = await contactService.getAllContactAdmin(token);
		console.log(response);
		if (response) {
			setTasks(response);
			setAllContacts(contacts);
		}
	};

	useEffect(() => {
		getAllTasks();
	}, []);

	//-------Creating new task

	const createTask = async (e) => {
		e.preventDefault();
		console.log(newTask);
		const data = await taskService.createTask(newTask);
		if(data){

			handleClose();
			getAllTasks();
		}
	};
	//edit handler
	const editHandler = (data) => {
		setEditTask(data);
		setOpenPopup(true);
	};

	const deleteHandler =(id)=>{
		setDeleteTask(id)
		setOpenModal(true)

	}
	const confirmDeleteTask=async()=>{
		try{
			const response =await taskService.deleteTaskAdmin(token,deleteTask)
			if(response){
				setOpenModal(false)
				getAllTasks()
			}

		}catch(err){
			console.log(err)
		}
	}

	

	return (
		<div style={{ height: 400, width: '100%' }}>
			<Button className="create-task-btn" variant="contained" onClick={handleClickOpen}>
				Create Task
			</Button>
			<h2>Task</h2>
			<Box sx={{ width: '100%', height: '50px', backgroundColor: '' }}></Box>
			<TableContainer>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow sx={{ fontSize: '25px30px', fontWeight: '900', backgroundColor: '#9e9e9e' }}>
							<TableCell>Title</TableCell>
							<TableCell>Task Type</TableCell>
							<TableCell>Assigned To</TableCell>
							<TableCell>Priority</TableCell>
							<TableCell>Due Date</TableCell>
							<TableCell>Task Status</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tasks.map((item) => (
							<TableRow key={item._id}>
								<TableCell>{item.title}</TableCell>
								<TableCell>{item.task_type}</TableCell>
								<TableCell>{item.assigned_to.username}</TableCell>
								<TableCell>{item.priority}</TableCell>
								<TableCell>{item.due_date}</TableCell>
								<TableCell>{item.task_status}</TableCell>
								<TableCell>
									<Button
										sx={{ width: '10px' }}
										variant="outlined"
										onClick={() => editHandler(item)}>
										<EditIcon />
									</Button>
									<Button variant="outlined" color="error" onClick={()=>deleteHandler(item._id)}>
										<ClearIcon />{' '}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{/* <DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/> */}
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
							<InputLabel id="demo-simple-select-autowidth-label" style={{ marginLeft: '10px' }}>
								Type
							</InputLabel>
							<Select
								sx={{ m: 1, minWidth: 280,width:'482px' }}
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={type}
								onChange={onchange}
								name="type">
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={'To-do'}>To-do</MenuItem>
								<MenuItem value={'Call'}>Call</MenuItem>
								<MenuItem value={'Email'}>Email</MenuItem>
							</Select>

							<InputLabel id="demo-simple-select-autowidth-label" style={{ marginLeft: '10px' }}>
								Priority
							</InputLabel>
							<Select
								sx={{ m: 1, minWidth: 280 ,width:'482px' }}
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={priority}
								onChange={onchange}
								name="priority"
								autoWidth>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={'Low'}>Low</MenuItem>
								<MenuItem value={'Medium'}>Medium</MenuItem>
								<MenuItem value={'High'}>High</MenuItem>
							</Select>
							<InputLabel id="demo-simple-select-autowidth-label" style={{ marginLeft: '10px' }}>
							Associated with records
							</InputLabel>
							<Select
								sx={{ m: 1, minWidth: 280 ,width:'482px'}}
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={associated}
								onChange={onchange}
								name="associated"
								autoWidth>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{allContacts.map((item) => {
									return <MenuItem value={item._id}>{item.firstname}</MenuItem>;
								})}

								
							</Select>

							{/* <TextField
								id="outlined-basic"
								className="outlined-basic1"
								label="Associated with records"
								variant="outlined"
								name="associated"
								value={associated}
								onChange={onchange}
							/> */}

							<InputLabel id="demo-simple-select-autowidth-label" style={{ marginLeft: '10px' }}>
								Assigned to
							</InputLabel>
							<Select
								sx={{ m: 1, minWidth: 280,width:'482px' }}
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={assignedTo}
								onChange={onchange}
								name="assignedTo"
								>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{users.map((user) => {
									return <MenuItem value={user._id}>{user.username}</MenuItem>;
								})}
								{/* <MenuItem value={'Low'}>Low</MenuItem>
								<MenuItem value={'Medium'}>Medium</MenuItem>
								<MenuItem value={'High'}>High</MenuItem> */}
							</Select>
							<InputLabel id="demo-simple-select-autowidth-label" style={{ marginLeft: '10px' }}>
								Due Date
							</InputLabel>
							<TextField
								id="outlined-basic"
								className="outlined-basic"
								variant="outlined"
								type="date"
								name="dueDate"
								value={dueDate}
								onChange={onchange}
							/>
							<TextField
								id="outlined-basic"
								className="outlined-basic"
								label="Time"
								type="time"
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
			<Popup title="Edit Task" openPopup={openPopup} setOpenPopup={setOpenPopup}>
				<EditTaskForm
					users={users}
					editTask={editTask}
					setEditTask={setEditTask}
					openPopup={openPopup}
					setOpenPopup={setOpenPopup}
					getAllTasks={getAllTasks}
					allContacts={allContacts}
				/>
			</Popup>
			<DeleteModal  openModal={openModal} setOpenModal={setOpenModal} confirmDeleteTask={confirmDeleteTask}>
				
								<ModalBody/>
			</DeleteModal>
			
			
		</div>
	);
}

function ModalBody(){
	return(
		<Box>
			<Typography >
			Do you want to delete?
			</Typography>
			
		</Box>
	)
}
// function Priority() {
// 	const [age, setAge] = React.useState('');

// 	const handleChange = (event) => {
// 		setAge(event.target.value);
// 	};

// 	return (
// 		<div>
// 			<FormControl sx={{ m: 1, minWidth: 280 }}>
// 				<InputLabel id="demo-simple-select-autowidth-label">Priority</InputLabel>
// 				<Select
// 					labelId="demo-simple-select-autowidth-label"
// 					id="demo-simple-select-autowidth"
// 					value={age}
// 					onChange={handleChange}
// 					autoWidth
// 					label="Age">
// 					<MenuItem value="">
// 						<em>None</em>
// 					</MenuItem>
// 					<MenuItem value={'Low'}>Low</MenuItem>
// 					<MenuItem value={'Medium'}>Medium</MenuItem>
// 					<MenuItem value={'High'}>High</MenuItem>
// 				</Select>
// 			</FormControl>
// 		</div>
// 	);
// }

// function Type() {
// 	const [type, setType] = React.useState('');

// 	const handleChange = (event) => {
// 		setType(event.target.value);
// 	};

// 	return (
// 		<div>
// 			<FormControl sx={{ m: 1, minWidth: 280 }}>
// 				<InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
// 				<Select
// 					labelId="demo-simple-select-autowidth-label"
// 					id="demo-simple-select-autowidth"
// 					value={type}
// 					onChange={handleChange}
// 					autoWidth
// 					label="Type">
// 					<MenuItem value="">
// 						<em>None</em>
// 					</MenuItem>
// 					<MenuItem value={'To-do'}>To-do</MenuItem>
// 					<MenuItem value={'Call'}>Call</MenuItem>
// 					<MenuItem value={'Email'}>Email</MenuItem>
// 				</Select>
// 			</FormControl>
// 		</div>
// 	);
// }
