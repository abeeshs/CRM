import { Box, Button, Grid, InputLabel, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { setNewMeeting } from '../../features/meeting/meetingSlice';
import * as userService from '../../services/userService';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

function Scheduling({ meetings, setMeetings }) {
	const dispatch = useDispatch();
	const [users, setUsers] = useState([]);
	const [assignedUser, setAssignedUser] = useState([]);

	const schema = yup.object().shape({
		member: yup.string(),
		schedulingTitle: yup.string().required('Title is required'),
		date: yup.string().required('Date is required'),
		time: yup.string().required('Time is required'),
		duration: yup.string().required('Duration is required')
	});

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});
	//form on submit function
	const onSubmit = async (data) => {
		let members = assignedUser.map((item) => {
			return {
				memberId: item.value,
				name: item.label
			};
		});
		dispatch(setNewMeeting({ data, members }));
		localStorage.setItem('members', JSON.stringify(members));
		setMeetings((state) => [...state, data, members]);
	};
	const getUserDetails = async () => {
		const response = await userService.getAllUser();
		if (response) {
			let arrObj = response.map((item) => {
				return {
					label: item.username,
					value: item._id
				};
			});

			setUsers(arrObj);
		}
	};

	//select multippile option
	const selectMulti = (assignedUser) => {
		setAssignedUser(assignedUser);
	};
	const animatedComponents = makeAnimated();

	useEffect(() => {
		getUserDetails();
	}, []);
	return (
		<Box
			sx={{
				width: '100%',
				height: '80vh',
				display: 'flex',
				justifyContent: 'center',
				pt: '90px'
			}}>
			<Box
				sx={{
					width: '50%',
					height: '90%',
					backgroundColor: 'white'
				}}>
				<h4 className="commen-font" style={{ fontWeight: '600', paddingLeft: '8px' }}>
					Scheduling
				</h4>
				<Box
					sx={{
						height: '100px',
						display: 'flex',
						justifyContent: 'center',
						backgroundColor: 'white'
					}}>
					<form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
						<Stack spacing={1} sx={{ width: 500, paddingLeft: '15px' }}>
							<InputLabel className="input-label-f" htmlFor="my-input">
								Team Members
							</InputLabel>
							<p>Choose the team members you want to participate in this group meeting</p>
							<Select
								isMulti
								value={assignedUser}
								components={animatedComponents}
								onChange={selectMulti}
								options={users}
							/>

							<InputLabel className="input-label-f" htmlFor="my-input">
								Scheduling Title
							</InputLabel>
							<TextField
								size="small"
								id="outlined-basic"
								className="outlined-basic"
								sx={{ backgroundColor: '#f5f8fa' }}
								name="schedulingTitle"
								error={!!errors.schedulingTitle}
								helperText={errors.schedulingTitle ? errors.schedulingTitle.message : ''}
								{...register('schedulingTitle')}
							/>

							<InputLabel className="input-label-f" htmlFor="my-input">
								Meeting Date
							</InputLabel>

							<TextField
								size="small"
								sx={{ backgroundColor: '#f5f8fa' }}
								id="outlined-basic"
								className="outlined-basic"
								variant="outlined"
								fullWidth
								type="date"
								name="date"
								error={!!errors.date}
								helperText={errors.date ? errors.date.message : ''}
								{...register('date')}
							/>
							<Grid container>
								<Grid xs={12} md={12} sm={12}>
									<InputLabel className="input-label-f" htmlFor="my-input">
										Time
									</InputLabel>
									<TextField
										id="time"
										size="small"
										type="time"
										sx={{ backgroundColor: '#f5f8fa' }}
										name="time"
										error={!!errors.time}
										helperText={errors.time ? errors.time.message : ''}
										{...register('time')}
									/>
								</Grid>
								<Grid xs={12} md={12} sm={12}>
									<InputLabel className="input-label-f" htmlFor="my-input">
										Duration
									</InputLabel>
									<TextField
										id="duration"
										size="small"
										sx={{ backgroundColor: '#f5f8fa' }}
										name="duration"
										error={!!errors.duration}
										helperText={errors.duration ? errors.duration.message : ''}
										{...register('duration')}
									/>
								</Grid>
							</Grid>

							<Button
								type="submit"
								className="meeting-btn"
								style={{ color: 'white', margin: '25px' }}>
								{' '}
								Create
							</Button>
						</Stack>
					</form>
				</Box>
			</Box>
		</Box>
	);
}

export default Scheduling;
