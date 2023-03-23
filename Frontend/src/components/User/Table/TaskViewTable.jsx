import React from 'react';
import {
	Box,
	Button,
	Chip,
	MenuItem,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	
	TableRow,
	TextField
} from '@mui/material';
import { useState } from 'react';
import * as taskService from '../../../services/taskService';
import { useSelector } from 'react-redux';
import './Table.css';

function TaskViewTable(props) {
	const { viewTask, setViewTask } = props;
	const [status, setStatus] = useState('');
	const [file, setFile] = useState(null);

	const { token } = useSelector((state) => state.userAuth);

	//change the task status
	const changeStatus = async (e) => {
		viewTask.task_status = e.target.value;
		setStatus(e.target.value);
		const response = await taskService.changeTaskStatus(token, e.target.value, viewTask._id);
	};
	const handleChange = (e) => {
		setFile(e.target.files[0]);
	};
	const submitHandler = async (e) => {
		e.preventDefault();

		const data = new FormData();

		data.append('file', file);

		const response = await taskService.uploadFile(token, data, viewTask._id);
	};
	if (file) {
	}

	return (
		<Box>
			<TableContainer>
				<Table sx={{ minWidth: 550 }}>
					<TableBody>
						<TableRow key={'12'}>
							<TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
							<TableCell>{viewTask.title}</TableCell>
						</TableRow>
						<TableRow key={'13'}>
							<TableCell sx={{ fontWeight: 700 }}>Task Type</TableCell>
							<TableCell>{viewTask.task_type}</TableCell>
						</TableRow>
						<TableRow key={'14'}>
							<TableCell sx={{ fontWeight: 700 }}>Created By</TableCell>
							<TableCell>{viewTask.created_by.firstname}</TableCell>
						</TableRow>
						<TableRow key={'15'}>
							<TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
							<TableCell>{viewTask.priority}</TableCell>
						</TableRow>
						<TableRow key={'16'}>
							<TableCell sx={{ fontWeight: 700 }}>Due Date</TableCell>
							<TableCell>{viewTask.due_date}</TableCell>
						</TableRow>
						<TableRow key={'17'}>
							<TableCell sx={{ fontWeight: 700 }}>Descrition</TableCell>
							<TableCell>{viewTask.description}</TableCell>
						</TableRow>
						<TableRow key={'18'}>
							<TableCell sx={{ fontWeight: 700 }}>Task Status</TableCell>
							<TableCell>
								{' '}
								<Chip label={viewTask.task_status} color="primary" variant="outlined" />
							</TableCell>
						</TableRow>
						<TableRow key={'19'}>
							<TableCell sx={{ fontWeight: 700 }}>Change Status</TableCell>
							{viewTask.task_status === 'Completed' ? (
								<TableCell>Compleated</TableCell>
							) : (
								<TableCell>
									<TextField
										onChange={changeStatus}
										color="secondary"
										fullWidth
										id="outlined-select-currency"
										select
										defaultValue={viewTask.task_status}>
										<MenuItem value={'Pending'}>Pending</MenuItem>
										<MenuItem value={'Task varifying'}>Completed</MenuItem>
									</TextField>
								</TableCell>
							)}
						</TableRow>

						<TableRow key={'20'}>
							<TableCell sx={{ fontWeight: 700 }}>Upload file</TableCell>
							<TableCell sx={{ fontWeight: 700 }}>
								<form onSubmit={submitHandler}>
									<input className="custom-file-input" onChange={handleChange} type="file" />
									<Button
										type="submit"
										variant="contained"
										sx={{
											backgroundColor: 'black',
											color: 'white',
											height: '30px',
											marginTop: '10px',
											width: '80px'
										}}>
										Save
									</Button>
								</form>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<div class="files__entity">
					<i class="files__icon fa fa-file-text" aria-hidden="true"></i>
					{file ? <img src={`${URL.createObjectURL(file)}`} alt="g" /> : ''}

					<p>Files</p>
					<a href=""></a>

					<a href={`${process.env.REACT_APP_SERVER_URL}/public/${viewTask.file}`}>
						{' '}
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
							style={{ width: '100px', height: '100px' }}
							alt=""
						/>
					</a>
					{/* <img src={`${process.env.REACT_APP_SERVER_URL}/public/${viewTask.file}`} alt="not available" /> */}
					{/* <embed src={`${process.env.REACT_APP_SERVER_URL}/public/${viewTask.file}`} type='application/pdf' width="180px" height="130px" /> */}
				</div>
			</TableContainer>
		</Box>
	);
}

export default TaskViewTable;
