import {
	Box,
	Button,
	Divider,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	SwipeableDrawer,
	TextField,
	Typography
} from '@mui/material';
import React, { useState } from 'react';
import './RightSidebar.css';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminToken } from '../../../features/auth/adminAuthSlice.js';
import { useNavigate } from 'react-router-dom';
import * as contactService from '../../../services/contactService.js';
import * as userService from '../../../services/userService.js';

function RightSideBar({ getAllContacts }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//schema for create contact form
	const schema = yup.object().shape({
		firstname: yup.string().required('First Name is required'),
		lastname: yup.string().required('Last Name is required'),
		email: yup.string().email().required('Email is required'),
		mobile: yup.number().min(10).positive().integer().required('Mobile is required'),
		contactOwner: yup.string(),
		jobTitle: yup.string(),
		lifeCycle: yup.string(),
		leadStatus: yup.string()
	});

	//setting schema
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});

	//form on submit function
	const onSubmit = async (data) => {
		
		const response = await contactService.createContact(data);
		
		if (response) {
			//dispatch(setAdminToken({ token: response.token, admin: true }));
			navigate('/contacts');
		}
	};

	const [state, setState] = React.useState({ right: false });
	const [users, setUsers] = React.useState([]);

	

	const { token } = useSelector((state) => state.userAuth);
	const toggleDrawer = (anchor, open) => async (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });

	
		const userlist = await userService.viwAllusers(token);
		setUsers(userlist);
		getAllContacts();
	};

	const list = (anchor) => (
		<Box sx={{ width: 550 }} role="presentation">
			<Box className="button-color" sx={{ width: '100%', height: '70px', position: 'sticky' }}>
				<Stack direction="row" justifyContent="space-between" padding="20px">
					<Typography variant="h5" sx={{ color: 'white', fontWeight: '500' }}>
						Create Contact
					</Typography>
					<CloseIcon
						onClick={toggleDrawer(anchor, false)}
						onKeyDown={toggleDrawer(anchor, false)}
						sx={{ color: 'white', right: '0', fontSize: '30px' }}
					/>
				</Stack>
			</Box>
			<Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={1} justifyContent="center" sx={{ width: 500, paddingLeft: '15px' }}>
						<p style={{ color: 'red' }}>{errors.email?.message}</p>
						<InputLabel className="label" htmlFor="my-input">
							Email address
						</InputLabel>
						<TextField sx={{ width: 500 }} name="email" {...register('email')} />
						<p style={{ color: 'red' }}>{errors.firstname?.message}</p>
						<InputLabel className="label" htmlFor="my-input">
							First name
						</InputLabel>
						<TextField sx={{ width: 500 }} name="firstname" {...register('firstname')} />
						<p style={{ color: 'red' }}>{errors.lastname?.message}</p>
						<InputLabel className="label" htmlFor="my-input">
							Last name
						</InputLabel>
						<TextField sx={{ width: 500 }} name="lastname" {...register('lastname')} />
						<p style={{ color: 'red' }}>{errors.contactOwner?.message}</p>
						<InputLabel className="label" htmlFor="my-input">
							Contact owner
						</InputLabel>
						<Select
							sx={{ m: 1, minWidth: 280 }}
							labelId="demo-simple-select-autowidth-label"
							id="contactOwner"
							onChange={onchange}
							autoWidth
							name="contactOwner"
							{...register('contactOwner')}>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{users.map((user) => {
								return <MenuItem value={user._id}>{user?.username}</MenuItem>;
							})}
						</Select>
						<p style={{ color: 'red' }}>{errors.jobTitle?.message}</p>
						<InputLabel className="label" htmlFor="my-input">
							Job title
						</InputLabel>
						<TextField sx={{ width: 500 }} name="jobTitle" {...register('jobTitle')} />
						<InputLabel className="label" htmlFor="my-input">
							Phone number
						</InputLabel>
						<TextField sx={{ width: 500 }} name="mobile" {...register('mobile')} />
						<InputLabel className="label" htmlFor="my-input">
							Life cycle stage
						</InputLabel>
						<Select
							sx={{ m: 1, minWidth: 280 }}
							labelId="demo-simple-select-autowidth-label"
							id="lifeCycle"
							onChange={onchange}
							autoWidth
							name="lifeCycle"
							{...register('lifeCycle')}>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={'Lead'}>Lead</MenuItem>
							<MenuItem value={'Marketing Qualified Lead'}>Marketing Qualified Lead</MenuItem>
							<MenuItem value={'Sales Qualified Field'}>Sales Qualified Field</MenuItem>
							<MenuItem value={'Customer'}>Customer</MenuItem>
						</Select>
						<InputLabel className="label" htmlFor="my-input">
							Lead Status
						</InputLabel>
						<Select
							sx={{ m: 1 }}
							labelId="demo-simple-select-autowidth-label"
							id="demo-simple-select-autowidth"
							onChange={onchange}
							autoWidth
							name="leadStatus"
							{...register('leadStatus')}>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={'New'}>New</MenuItem>
							<MenuItem value={'Open Deal'}>Open Deal</MenuItem>
							<MenuItem value={'Unqualified'}>Unqualified</MenuItem>
							<MenuItem value={'Attempt to contact'}>Attempt to contact</MenuItem>
							<MenuItem value={'Connected'}>Connected</MenuItem>
							<MenuItem value={'Bad timing'}>Bad timing</MenuItem>
						</Select>
					</Stack>
					<Button
						type="submit"
						className="button-color"
						style={{ color: 'white', margin: '25px' }}
						onClick={toggleDrawer('right', false)}>
						{' '}
						Create
					</Button>
				</form>
			</Box>

			{/* <List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon></ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List> */}
			<Divider />
			{/* <List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon></ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List> */}
		</Box>
	);
	return (
		<div>
			<React.Fragment>
				<Button
					sx={{ float: 'right', marginBottom: '20px' }}
					className="button-color"
					variant="contained"
					onClick={toggleDrawer('right', true)}>
					Create
				</Button>
				<SwipeableDrawer
					anchor={'right'}
					open={state['right']}
					//onClose={toggleDrawer('right', false)}
					onOpen={toggleDrawer('right', true)}>
					{list('right')}
				</SwipeableDrawer>
			</React.Fragment>
		</div>
	);
}

export default RightSideBar;
