import { Button, InputLabel, MenuItem, TextField } from '@mui/material';
import Select from 'react-select';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UpgradeSharpIcon from '@mui/icons-material/UpgradeSharp';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import * as taskService from '../../../../services/taskService';
import { useSelector } from 'react-redux';
import makeAnimated from 'react-select/animated';

function EditTaskForm(props) {
	const test = { label: 'no text', value: 'tes55t' };
	const {
		editTask,
		setEditTask,
		openPopup,
		setOpenPopup,
		getAllTasks,
		users,
		allContacts,
		taskType,
		priorityy
	} = props;
	const animatedComponents = makeAnimated();
	const [priority, setPriority] = useState([]);
	const [types, setType] = useState([]);
	const [associated, setAssociated] = useState([]);
	const [assignedUser, setAssignedUser] = useState([]);
	console.log(editTask);

	const selectType = (types) => {
		setType(types);
	};
	const selectPriority = (priority) => {
		setPriority(priority);
	};
	const selectAssociated = (associated) => {
		setAssociated(associated);
	};
	const selectMulti = (assignedUser) => {
		setAssignedUser(assignedUser);
	};

	useEffect(() => {
		reset(editTask);
	}, []);

	const schema = yup.object().shape({
		title: yup.string().required('Title is required *'),
		type: yup.string(),
		priority: yup.string(),
		associated: yup.string(),
		assignedTo: yup.string(),
		dueDate: yup.string().required('Date is required *'),
		time: yup.string(),
		description: yup.string()
	});

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});

	const { token } = useSelector((state) => state.adminAuth);
	const onSubmit = async (data) => {
		try {
			console.log(data);
			console.log('errors');
			const taskId = editTask._id;
			const response = await taskService.editTaskAdmin(token, data, taskId);
			if (response) {
				setOpenPopup(false);
				getAllTasks();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<p style={{ fontSize: '15px', color: 'red' }}>{errors.title?.message}</p>

			<TextField
				id="outlined-basic"
				fullWidth
				className="outlined-basic1"
				label="Title *"
				variant="outlined"
				name="title"
				{...register('title')}
			/>
			<InputLabel
				id="demo-simple-select-autowidth-label"
				style={{ marginLeft: '10px', marginTop: '10px' }}>
				Type
			</InputLabel>
			<Select
				className="basic-single"
				defaultValue={{ label: editTask.priority, value: 0 }}
				value={types}
				onChange={selectType}
				options={taskType}
			/>
			{/* <Select
				sx={{ m: 1, minWidth: 280, width: '482px' }}
				labelId="demo-simple-select-autowidth-label"
				id="demo-simple-select-autowidth"
				autoWidth
				name="type"
				defaultValue={editTask.task_type}
				{...register('type')}>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				<MenuItem value={'To-do'}>To-do</MenuItem>
				<MenuItem value={'Call'}>Call</MenuItem>
				<MenuItem value={'Email'}>Email</MenuItem>
			</Select> */}

			<InputLabel
				id="demo-simple-select-autowidth-label"
				style={{ marginLeft: '10px', marginTop: '10px' }}>
				Priority
			</InputLabel>
			<Select
				className="basic-single"
				value={priority}
				defaultValue={test[0]}
				onChange={selectPriority}
				options={priorityy}
			/>
			{/* <Select
				sx={{ m: 1, minWidth: 280, width: '482px' }}
				labelId="demo-simple-select-autowidth-label"
				id="demo-simple-select-autowidth"
				defaultValue={editTask.priority}
				name="priority"
				autoWidth
				{...register('priority')}>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				<MenuItem value={'Low'}>Low</MenuItem>
				<MenuItem value={'Medium'}>Medium</MenuItem>
				<MenuItem value={'High'}>High</MenuItem>
			</Select> */}

			<InputLabel
				id="demo-simple-select-autowidth-label"
				style={{ marginLeft: '10px', marginTop: '10px' }}>
				Associated with
			</InputLabel>
			<Select
				className="basic-single"
				value={associated}
				onChange={selectAssociated}
				options={allContacts}
				defaultValue={{ label: "vishnu", value: "vishnu" }}
			/>

			{/* <Select
				sx={{ m: 1, minWidth: 280, width: '482px' }}
				labelId="demo-simple-select-autowidth-label"
				id="demo-simple-select"
				defaultValue={editTask.title}
				name="associated"
				autoWidth
				{...register('associated')}>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{allContacts?.map((item) => {
					<p>{item}</p>;
					return <MenuItem value={item._id}>{item.firstname}</MenuItem>;
				})}
			</Select> */}

			{/* <TextField
				id="outlined-basic"
				className="outlined-basic1"
				label="Associated with records"
				variant="outlined"
				name="associated"
				defaultValue={editTask.asociated_contact}
                {...register('associated')}
			/> */}

			<InputLabel
				id="demo-simple-select-autowidth-label"
				style={{ marginLeft: '10px', marginTop: '10px' }}>
				Assigned to
			</InputLabel>
			<Select
				isMulti
				value={assignedUser}
				components={animatedComponents}
				onChange={selectMulti}
				options={users}
				defaultValue={{ label: 2002, value: 2002 }}
			/>
			{/* <Select
				sx={{ m: 1, minWidth: 280, width: '482px' }}
				labelId="demo-simple-select-autowidth-label"
				id="demo-simple-select-autowidth"
				name="assignedTo"
				autoWidth
				defaultValue={editTask?.assigned_to?.username}
				{...register('assignedTo')}>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{users?.map((user) => {
					return <MenuItem value={user._id}>{user.username}</MenuItem>;
				})}
			</Select> */}
			<InputLabel
				id="demo-simple-select-autowidth-label"
				style={{ marginLeft: '10px', marginTop: '10px' }}>
				Due Date
			</InputLabel>
			<TextField
				id="outlined-basic"
				className="outlined-basic"
				variant="outlined"
				type="date"
				name="dueDate"
				defaultValue={editTask.due_date}
				{...register('dueDate')}
			/>
			<TextField
				id="outlined-basic"
				className="outlined-basic"
				label="Time"
				type="time"
				variant="outlined"
				name="time"
				{...register('time')}
			/>
			<TextField
				sx={{ height: '86px', marginTop: '10px' }}
				name="description"
				fullWidth
				id="outlined-basic"
				className="note"
				label="Note *"
				variant="outlined"
				{...register('description')}
			/>

			<Button
				sx={{ float: 'right', marginRight: '50px', marginBottom: '50px' }}
				type="submit"
				variant="outlined">
				<UpgradeSharpIcon /> Update
			</Button>
			<Box sx={{ marginTop: '20px', paddingTop: '30px' }}></Box>
		</form>
	);
}

export default EditTaskForm;
