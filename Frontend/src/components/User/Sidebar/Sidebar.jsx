import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import ListIcon from '@mui/icons-material/List';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import './Sidebar.css';
import { Box } from '@mui/system';
import { Avatar, Collapse, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
const drawerWidth = 240;

export default function Sidebar(props) {
	const{setTableType,tableType}=props;
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open)
		navigate('/task') 
	};
	const navigate = useNavigate();
	return (
		<>
			<CssBaseline />
			{/* <Box sx={{ backgroundColor: 'White', width: '100%', height: '65px' }}>
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
			</Box> */}
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
				<Box sx={{ width: '20px', height: '65px' }}>
					<Typography></Typography>
					
				</Box>
				<Divider />

				<List>
					{[
						{ name: 'Contacts', icon: <PermContactCalendarIcon /> },
						{ name: 'Dashboard', icon: <DashboardIcon /> },
						{ name: 'Conversation', icon: <ChatIcon /> },
						{ name: 'Deals', icon: <ListIcon /> },
					].map((text, index) => (
						<ListItem key={text.name} disablePadding>
							<ListItemButton
								onClick={() => {
									let text2 = text.name.toLowerCase();
									console.log(text2);
									text2 === 'users' ? navigate('/admin') : navigate(`/${text2}`);
								}}>
								<ListItemIcon>{text.icon}</ListItemIcon>
								<ListItemText primary={text.name} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />

				<List>
					<ListItemButton onClick={handleClick}>
						<ListItemIcon>
						<TaskIcon />
						</ListItemIcon>
						<ListItemText primary="Task" />
						{/* {open ? <ExpandLess /> : <ExpandMore />} */}
					</ListItemButton>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItemButton sx={{ pl: 4 }} onClick={()=>setTableType("Pending")}>  
								<ListItemIcon>
								                                                 
								</ListItemIcon >
								<ListItemText primary="Pendig Task" />
							</ListItemButton>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemIcon>
								
								</ListItemIcon >
								<ListItemText primary="Compleated Task" onClick={()=>setTableType("Compleated")} />
							</ListItemButton>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemIcon>
								
								</ListItemIcon >
								<ListItemText primary="Varified Task" onClick={()=>setTableType("Varified")}/>
							</ListItemButton>
						</List>
					</Collapse>
					{[
						
						{ name: 'Settings', icon: <SettingsIcon /> }
					].map((text, index) => (
						<ListItem key={text.name} disablePadding>
							<ListItemButton
								onClick={() => {
									let text2 = text.name.toLowerCase();
									console.log(text2);
									text2 === 'users' ? navigate('/admin') : navigate(`/${text2}`);
								}}>
								<ListItemIcon>{text.icon}</ListItemIcon>
								<ListItemText primary={text.name} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Toolbar />
		</>
	);
}
