import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box,
	Button,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import * as contactService from '../../../../services/contactService';
function EditContactForm(props) {
	const { updateContact, setOpenPopup, getAllContacts, users } = props;

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
		reset,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});
	useEffect(() => {
		reset(updateContact);
	}, [updateContact, reset]);

	//form on submit function
	const onSubmit = async (data) => {
		try {
			console.log(data);
			const response = await contactService.updateContact(data);
			console.log(response);
			setOpenPopup(false);
			getAllContacts();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box
			sx={{
				marginTop: 1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
			<Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							color="secondary"
							autoComplete="given-name"
							name="firstname"
							required
							fullWidth
							focused
							id="firstname"
							label="First Name"
							{...register('firstname')}
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							color="secondary"
							required
							fullWidth
							id="lastname"
							label="Last Name"
							name="lastname"
							type="text"
							focused
							autoComplete="family-name"
							{...register('lastname')}
							error={!!errors.lastname}
							helperText={errors.lastname ? errors.lastname.message : ''}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							color="secondary"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							focused
							autoComplete="email"
							{...register('email')}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							color="secondary"
							required
							fullWidth
							name="mobile"
							label="Mobile"
							type="number"
							id="mobile"
							focused
							autoComplete="mobile"
							{...register('mobile')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							color="secondary"
							fullWidth
							id="outlined-select-currency"
							select
							label="Contact Owner"
							defaultValue={updateContact?.contact_owner?.username}>
							{users &&
								users.map((option) => (
									<MenuItem key={option?._id} value={option?.username}>
										{option?.username}
									</MenuItem>
								))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							color="secondary"
							required
							fullWidth
							id="jobTitle"
							label="Job Title"
							name="jobTitle"
							autoComplete="jobTitle"
							focused
							{...register('jobTitle')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							color="secondary"
							fullWidth
							id="outlined-select-currency"
							select
							label="Life Cycle Stage"
							defaultValue={updateContact.lifecycle_stage}
							{...register('lifeCycle')}>
							<MenuItem value={'Lead'}>Lead</MenuItem>
							<MenuItem value={'Marketing Qualified Lead'}>Marketing Qualified Lead</MenuItem>
							<MenuItem value={'Sales Qualified Field'}>Sales Qualified Field</MenuItem>
							<MenuItem value={'Customer'}>Customer</MenuItem>
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							color="secondary"
							fullWidth
							id="outlined-select-currency"
							select
							label="Lead Status"
							defaultValue={updateContact.lead_status}
							{...register('leadStatus')}>
							<MenuItem value={'New'}>New</MenuItem>
							<MenuItem value={'Open Deal'}>Open Deal</MenuItem>
							<MenuItem value={'Unqualified'}>Unqualified</MenuItem>
							<MenuItem value={'Attempt to contact'}>Attempt to contact</MenuItem>
							<MenuItem value={'Connected'}>Connected</MenuItem>
							<MenuItem value={'Bad timing'}>Bad timing</MenuItem>
						</TextField>
					</Grid>
				</Grid>
				<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: 'black' }}>
					Update
				</Button>
			</Box>
			{/* <Notification notify={notify} setNotify={setNotify} /> */}
		</Box>
	);
}

export default EditContactForm;
