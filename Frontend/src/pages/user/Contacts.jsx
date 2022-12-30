import React from 'react';
import Sidebar from '../../components/User/Sidebar/Sidebar';
import ContactsTable from '../../components/User/ContactsTable/ContactsTable';
import Box from '@mui/material/Box';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import {
	Avatar,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import Popup from '../../components/User/Popup/Popup.jsx';


function Contacts() {
	const [rightSIde, setRightSide] = useState(false);
	

	const toggleDrawer = (status) => {
		console.log('status');
		// setRightSide(status);
	};

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

	return (
		<div>
			<Box sx={{ backgroundColor: 'White', width: '100%', height: '65px' }}>
				<Avatar
					sx={{ float: 'right', margin: '10px', marginRight: '30px' }}
					alt="Travis Howard"
					src="/static/images/avatar/2.jpg"
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
			</Box>
			<Box sx={{ display: 'flex' }}>
				<Sidebar />
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
					
				
					<ContactsTable />
				</Box>
			</Box>
			
		</div>
	);
}

export default Contacts;
