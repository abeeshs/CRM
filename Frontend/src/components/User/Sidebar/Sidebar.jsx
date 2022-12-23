import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import ListIcon from '@mui/icons-material/List';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import './Sidebar.css';

const drawerWidth = 240;

export default function Sidebar() {
	return (
		<>
			<Box sx={{ backgroundColor: 'White', width: '100%' ,height:'65px'}}>
      <Avatar sx={{float:"right",margin:'10px',marginRight:"30px"}} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <CircleNotificationsIcon sx={{float:"right",margin:'15px',color:"grey",fontSize:"30px",marginRight:"30px"}}/>
      </Box>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />

				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box'
						}
					}}
					variant="permanent"
					anchor="left">
					<Toolbar />
					<Divider />
					<List>
						{[{name:'Contact',icon: <PermContactCalendarIcon />},{name:'Dashboard',icon:<DashboardIcon />}, 
            {name:'Conversation',icon:<ChatIcon/>},{name: 'Deals',icon:<ListIcon/>}].map((text, index) => (
							<ListItem key={text.name} disablePadding>
								<ListItemButton>
									<ListItemIcon>{text.icon}</ListItemIcon>
									<ListItemText primary={text.name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{[{name:'Tasks',icon: <TaskIcon />}, {name:'Settings',icon: <SettingsIcon />}].map((text, index) => (
							<ListItem key={text.name} disablePadding>
								<ListItemButton>
									<ListItemIcon>{text.icon}</ListItemIcon>
									<ListItemText primary={text.name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Drawer>
					<Toolbar />
				{/* <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
			
				</Box> */}
			</Box>
		</>
	);
}
