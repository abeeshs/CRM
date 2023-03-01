import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import * as adminService from '../../services/adminService';
import { useDispatch, useSelector } from 'react-redux';
import { meetingData } from '../../features/meeting/meetingSlice';
import { setNewMeeting } from '../../features/meeting/meetingSlice';


function Overview({ setMeetings }) {
	const [admin, setAdmin] = useState({});
	const dispatch = useDispatch();

	const schema = yup.object().shape({
		organizer: yup.string().required('Organizer is required'),
		eventTitle: yup.string().required('Event Title is required'),
		location: yup.string().required('Location Date is required'),
		description: yup.string().required('Description is required')
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
		console.log(data);
		dispatch(setNewMeeting(data));
		//setMeetings(data)
	};
	

	const getAdminData = async () => {
		const response = await adminService.getAdminDetails();
		console.log(response);
		if (response) {
			setAdmin(response);
		}
	};

	useEffect(() => {
		getAdminData();
	}, []);
	return (
		<Box
			sx={{
				// position:"absolute",
				// top:"200px",
				// bottom:"200px",
				// overflow:"auto",
				// left:'0',
				// right:"0"
				width: '100%',
				height: '80vh',
				display: 'flex',
				justifyContent: 'center',
				pt: '90px',
				backgroundColor: 'white'
			}}>
			<Box
				sx={{
					width: '50%',
					height: '90%',
					backgroundColor: 'white',

					paddingTop: '10px'
				}}>
				<h4 className="commen-font" style={{ fontWeight: '600', padding: '8px' }}>
					Overview
				</h4>
				<Box
					sx={{
						height: '100px',
						display: 'flex',
						justifyContent: 'center',
						backgroundColor: 'white'
					}}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
						<Stack spacing={1} justifyContent="center" sx={{ width: 500, paddingLeft: '15px' }}>
							{/* <InputLabel className="label" htmlFor="my-input">
									Deal Name *
								</InputLabel>
								<TextField
									sx={{ width: 500 }}
									name="dealName"
									{...register('dealName')}
									error={!!errors.dealName}
									helperText={errors.dealName ? errors.dealName.message : ''}
								/> */}

							<InputLabel className="input-label-f" htmlFor="my-input">
								Organizer *
							</InputLabel>
							<Select
								sx={{ backgroundColor: '#f5f8fa' }}
								labelId="demo-simple-select-autowidth-label"
								id="organizer"
								onChange={onchange}
								autoWidth
								name="organizer"
								error={!!errors.organizer}
								helperText={errors.organizer ? errors.organizer.message : ''}
								{...register('organizer')}>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={admin._id}>{admin.firstname}</MenuItem>
							</Select>

							<InputLabel className="input-label-f" htmlFor="my-input">
								Event Title
							</InputLabel>
							<TextField
								sx={{ backgroundColor: '#f5f8fa' }}
								name="eventTitle"
								error={!!errors.eventTitle}
								helperText={errors.eventTitle ? errors.eventTitle.message : ''}
								{...register('eventTitle')}
							/>

							<InputLabel className="input-label-f" htmlFor="my-input">
								Location
							</InputLabel>
							<TextField
								sx={{ backgroundColor: '#f5f8fa' }}
								id="outlined-basic"
								className="outlined-basic"
								variant="outlined"
								fullWidth
								type="text"
								name="location"
								error={!!errors.location}
								helperText={errors.location ? errors.location.message : ''}
								{...register('location')}
							/>
							<InputLabel className="input-label-f" htmlFor="my-input">
								Description
							</InputLabel>
							<TextField
								sx={{ backgroundColor: '#f5f8fa' }}
								name="description"
								error={!!errors.description}
								helperText={errors.description ? errors.description.message : ''}
								{...register('description')}
							/>
							{/* <InputLabel className="label" htmlFor="my-input">
									Deal Owner
								</InputLabel>
								<Select
									sx={{ m: 1, minWidth: 280 }}
									labelId="demo-simple-select-autowidth-label"
									id="dealOwner"
									onChange={onchange}
									autoWidth
									name="dealOwner"
									error={!!errors.dealOwner}
									helperText={errors.dealOwner ? errors.dealOwner.message : ''}
									{...register('dealOwner')}>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>

									{users?.map((user) => {
										return <MenuItem value={user._id}>{user?.username}</MenuItem>;
									})}
								</Select> */}

							{/* <InputLabel className="label" htmlFor="my-input">
									Priority
								</InputLabel>
								<Select
									sx={{ m: 1, minWidth: 280 }}
									labelId="demo-simple-select-autowidth-label"
									id="priority"
									onChange={onchange}
									autoWidth
									name="priority"
									error={!!errors.priority}
									helperText={errors.priority ? errors.priority.message : ''}
									{...register('priority')}>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value={'Low'}>Low</MenuItem>
									<MenuItem value={'Medium'}>Medium</MenuItem>
									<MenuItem value={'High'}>High</MenuItem>
								</Select> */}
						</Stack>
						<Button
							type="submit"
							className="meeting-btn"
							style={{ color: 'white', margin: '25px' }}>
							{' '}
							Create
						</Button>
					</form>
				</Box>
			</Box>
		</Box>
	);
}

export default Overview;
