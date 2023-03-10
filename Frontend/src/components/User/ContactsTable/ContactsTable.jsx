import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@mui/material';
import { useState } from 'react';
import * as contactService from '../../../services/contactService.js';
import { useEffect } from 'react';
import EditContactForm from '../Forms/Contacts/EditContactForm.jsx';
import RightSideBar from './RightSideBar.jsx';
import Popup from '../Popup/Popup.jsx';
import Notification from '../../Extra Components/Notification.js';
import { Box } from '@mui/system';
import ContactDeleteModal from '../Popup/ContactDeleteModal.jsx';
function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

// const rows = [
// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// 	createData('Eclair', 262, 16.0, 24, 6.0),
// 	createData('Cupcake', 305, 3.7, 67, 4.3),
// 	createData('Gingerbread', 356, 16.0, 49, 3.9)
// ];

export default function ContactsTable() {
	const [rows, setRows] = useState([]);
	const [openPopup, setOpenPopup] = useState(false);
	const [updateContact, setUpdateContact] = useState({});
	const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [deleteContactId, setDeleteContactId] = useState('');
	const closePopup = () => {};

	const getEditContact = (contact) => {
		setUpdateContact(contact);
		setOpenPopup(true);
	};
	//modal state
	const [open, setOpen] = useState(false);
	const handleClickOpen = async () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	//get all contacts
	const getAllcontacts = async () => {
		try {
			const response = await contactService.getAllContact();
			if (response) {
				setRows(response);
			}
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getAllcontacts();
	}, [updateContact]);

	const deleteContactHandler = (id) => {
		setDeleteContactId(id);
	};
	const confirmDeleteContact = async() => {
		try {
			const res= await contactService.deleteContact(deleteContactId)
		} catch (err) {
			
		}
	};

	return (
		<>
			<RightSideBar getAllContacts={getAllcontacts} />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead sx={{ backgroundColor: 'black', fontWeight: '900' ,fontWeight: 500}}>
						<TableRow>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }}>SL NO</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }}>NAME</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }} align="center">
								EMAIL
							</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }} align="right">
								PHONE NUMBER
							</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }} align="right">
								CONTACT OWNER
							</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }} align="right">
								CREATED AT
							</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }} align="right">
								OPTIONS
							</TableCell>
							<TableCell sx={{ fontSize: '15PX', fontWeight: '500',color:'white' }} align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow
								key={row.firstname}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell>{index + 1}</TableCell>
								<TableCell component="th" scope="row">
									{row.firstname}
								</TableCell>
								<TableCell align="center">{row.email}</TableCell>
								<TableCell align="right">{row.mobile}</TableCell>
								<TableCell align="right">{row.contact_owner?.username}</TableCell>
								<TableCell align="right">{row.createdAt}</TableCell>
								<TableCell align="right" sx={{ display: 'flex', justifyContent: 'space-between' }}>
									<Button
										sx={{ width: '10px' }}
										variant="outlined"
										onClick={() => getEditContact(row)}>
										<EditIcon />
									</Button>
									<Box sx={{ width: '5px' }}></Box>
									<Button
										variant="outlined"
										color="error"
										onClick={() => deleteContactHandler(row._id)}>
										<ClearIcon />{' '}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* <Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{'Create Task'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<form>
							<TextField
								id="outlined-basic"
								className="outlined-basic1"
								label="Title *"
								variant="outlined"
								name="title"
								onChange={onchange}
							/>
							<InputLabel id="demo-simple-select-autowidth-label" style={{ marginLeft: '10px' }}>
								Type
							</InputLabel>
							<Select
								sx={{ m: 1, minWidth: 280 }}
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								onChange={onchange}
								autoWidth
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
								sx={{ m: 1, minWidth: 280 }}
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
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

							<TextField
								id="outlined-basic"
								className="outlined-basic1"
								label="Associated with records"
								variant="outlined"
								name="associated"
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
			</Dialog> */}
			<Popup title={'Edit Contact'} openPopup={openPopup} setOpenPopup={setOpenPopup}>
				<EditContactForm
					setOpenPopup={setOpenPopup}
					updateContact={updateContact}
					getAllContacts={getAllcontacts}
				/>
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ContactDeleteModal
				openDeleteModal={openDeleteModal}
				setOpenDeleteModal={setOpenDeleteModal}
				confirmDeleteContact={confirmDeleteContact}
			/>
		</>
	);
}
