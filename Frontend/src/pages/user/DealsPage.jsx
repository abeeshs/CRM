import React from 'react';
import Sidebar from '../../components/User/Sidebar/Sidebar';
import ContactsTable from '../../components/User/ContactsTable/ContactsTable';
import Box from '@mui/material/Box';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useState } from 'react';

function DealsPage() {
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
					<h3>Deals </h3>
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							bgcolor: 'background.default',
							marginTop: '50px',
							marginRight: '15px'
						}}></Box>
				</Box>
			</Box>
		</div>
	);
}

export default DealsPage;
