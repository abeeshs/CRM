import React, { useEffect } from 'react';
import Sidebar from '../../components/User/Sidebar/Sidebar';
import ContactsTable from '../../components/User/ContactsTable/ContactsTable';
import Box from '@mui/material/Box';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import Popup from '../../components/User/Popup/Popup.jsx';
import * as userService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/User/Header/Header';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';

function Contacts() {
	const navigate = useNavigate();
	const token = useSelector((state) => state.userAuth.token);

	console.log(token);
	useEffect(() => {
		if (!token) {
			navigate('/');
		}
	}, []);

	const [rightSIde, setRightSide] = useState(false);

	const toggleDrawer = (status) => {
		console.log('status');
		// setRightSide(status);
	};

	console.log('thsd hdgdgg');

	//right sidebar
	function List({ anchor }) {
		return (
			<Box
				sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
				role="presentation">
				<List>
					{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon></ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
			</Box>
		);
	}

	const [anchorEl, setAnchorEl] = React.useState(null);
	const opens = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	//logOut user
	const logoutUser = async () => {
		const res = await userService.userLogOut();
		console.log(res);
		if (res) {
			navigate('/');
			handleClose();
		}
	};

	return (
		<div>
			<Header />
			<Container maxWidth="xl">
				<Typography component="div" variant="h6" marginTop="10px">
					Contacts
				</Typography>

				<ContactsTable />
			</Container>
		</div>
	);
}

export default Contacts;
