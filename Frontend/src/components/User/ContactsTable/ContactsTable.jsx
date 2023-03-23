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
import { Button } from '@mui/material';
import { useState } from 'react';
import * as contactService from '../../../services/contactService.js';
import { useEffect } from 'react';
import EditContactForm from '../Forms/Contacts/EditContactForm.jsx';
import RightSideBar from './RightSideBar.jsx';
import Popup from '../Popup/Popup.jsx';
import Notification from '../../Extra Components/Notification.js';
import { Box } from '@mui/system';
import ContactDeleteModal from '../Popup/ContactDeleteModal.jsx';
import DeleteModal from '../../Extra Components/DeleteModal.jsx';
import * as userService from '../../../services/userService';

export default function ContactsTable() {
	const [rows, setRows] = useState([]);
	const [openPopup, setOpenPopup] = useState(false);
	const [updateContact, setUpdateContact] = useState({});
	const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [deleteContactId, setDeleteContactId] = useState('');
	const [users, setUsers] = useState([]);

	const { token } = JSON.parse(localStorage.getItem('user'));

	const getAllUsers = async () => {
		const userlist = await userService.viwAllusers(token);

		setUsers(userlist.users);
	};
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
		getAllUsers();
		getAllcontacts();
	}, []);

	const deleteContactHandler = (id) => {
		setDeleteContactId(id);
		setOpenDeleteModal(true);
	};
	const confirmDeleteContact = async () => {
		try {
			const res = await contactService.deleteContact(deleteContactId);
			if (res) {
				setOpenDeleteModal(false);
				getAllcontacts();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<RightSideBar users={users} getAllContacts={getAllcontacts} />
			{rows.length > 0 ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead sx={{ backgroundColor: 'black', fontWeight: '900', fontWeight: 500 }}>
							<TableRow>
								<TableCell sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}>
									SL NO
								</TableCell>
								<TableCell sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}>
									NAME
								</TableCell>
								<TableCell
									sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
									align="center">
									EMAIL
								</TableCell>
								<TableCell
									sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
									align="right">
									PHONE NUMBER
								</TableCell>
								<TableCell
									sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
									align="right">
									CONTACT OWNER
								</TableCell>
								<TableCell
									sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
									align="right">
									CREATED AT
								</TableCell>
								<TableCell
									sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
									align="right">
									OPTIONS
								</TableCell>
								<TableCell
									sx={{ fontSize: '15PX', fontWeight: '500', color: 'white' }}
									align="right"></TableCell>
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
									<TableCell
										align="right"
										sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
			) : (
				<Box sx={{ widht: '100%', height: '600px' }}>
					<div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
						<img src="/images/empty.jpg" style={{ width: '400px', height: '400px' }} alt="" />
						<h2 className="commen-font" style={{ fontWeight: '800' }}>
							No Contacts yet
						</h2>
					</div>
				</Box>
			)}
			<Popup title={'Edit Contact'} openPopup={openPopup} setOpenPopup={setOpenPopup}>
				<EditContactForm
					users={users}
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
