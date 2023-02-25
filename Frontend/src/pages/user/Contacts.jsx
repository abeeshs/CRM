import React, { useEffect } from 'react';
import Sidebar from '../../components/User/Sidebar/Sidebar';
import ContactsTable from '../../components/User/ContactsTable/ContactsTable';
import Box from '@mui/material/Box';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import {
	Avatar,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import Popup from '../../components/User/Popup/Popup.jsx';
import * as userService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/User/Header/Header';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';

function Contacts() {
	const [rightSIde, setRightSide] = useState(false);
	const navigate = useNavigate();

	const toggleDrawer = (status) => {
		console.log('status');
		// setRightSide(status);
	};
	
	const token= useSelector((state)=>state.userAuth.token)||JSON.parse(localStorage.getItem('user'))
	console.log("thsd hdgdgg")
	
	console.log(token)

	useEffect(()=>{
		if(!token){
			navigate('/')
		}
		
	},[])

	//right sidebar
	function List({ anchor }) {
		return (
			<Box
				sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
				role="presentation"
				// onClick={() => toggleDrawer(false)}
				// onKeyDown={() => toggleDrawer(false)}
			>
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
			{/* <Box sx={{ backgroundColor: 'White', width: '100%', height: '65px' }}>
				<Avatar
					sx={{ float: 'right', margin: '10px', marginRight: '30px' }}
					alt="Travis Howard"
					src="/static/images/avatar/2.jpg"
					onClick={handleClick}
				/>
				<CircleNotificationsIcon
					sx={{
						float: 'right',
						margin: '15px',
						color: 'grey',
						fontSize: '30px',
						marginRight: '30px'
					}}
				/>
				<Menu
					aid="basic-menu"
					anchorEl={anchorEl}
					open={opens}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button'
					}}>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
					<MenuItem onClick={logoutUser}>Logout</MenuItem>
				</Menu>
			</Box> */}
			{/* <Box sx={{ display: 'flex' }}>
				
				<Box>
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							bgcolor: 'background.default',
							marginTop: '50px',
							marginRight: '15px'
						}}></Box>
					<h3>Contacts</h3>
					
				
					
				</Box>
			</Box> */}
		</div>
	);
}

export default Contacts;
