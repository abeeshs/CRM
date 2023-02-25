import {
	AppBar,
	Collapse,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography
} from '@mui/material';
import { Box } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import './Header.css';
import * as authService from '../../../services/authService';

function Header() {
	const navigate = useNavigate();
	const [tableType, setTableType] = useState('');
	const [open, setOpen] = useState(false);

	const tableHandle = (type) => {
		setTableType(type);
	};
	const signOutHandler = async () => {
		let res = await authService.userLogout();
		if (res) {
			navigate('/');
		}
	};
	return (
		<Box>
			<AppBar position="static">
				<Toolbar sx={{ backgroundColor: 'white' }}>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'black',
							textDecoration: 'none'
						}}>
						LOGO
					</Typography>

					<Typography
						className="dropdown"
						variant="h6"
						noWrap
						component="div"
						onClick={() => navigate('/contacts')}
						sx={{
							color: 'black',
							height: '28px',
							fontFamily: '',
							fontSize: '16px',
							fontFamily: 'sans-serif',
							paddingLeft: '40px'
						}}>
						Contacts
					</Typography>

					<div class="dropdown">
						<Typography
							className="dropdown"
							variant="h6"
							noWrap
							component="div"
							onClick={() => navigate('/task')}
							sx={{
								color: 'black',
								height: '28px',
								fontFamily: '',
								fontSize: '16px',
								fontFamily: 'sans-serif',
								paddingLeft: '40px'
							}}>
							Task
						</Typography>

						<div className="dropdown-content">
							<List>
								<ListItem disablePadding>
									<ListItemButton onClick={() => navigate('/task/pending-task')}>
										<Typography sx={{ color: 'Black', fontSize: '15px', paddingLeft: '7px' }}>
											{' '}
											Pending Task
										</Typography>
									</ListItemButton>
								</ListItem>

								<ListItem disablePadding>
									<ListItemButton onClick={() => navigate('/task/completed-task')}>
										<Typography sx={{ color: 'Black', fontSize: '15px' }}>
											{' '}
											Completed Task
										</Typography>
									</ListItemButton>
								</ListItem>
							</List>
						</div>
					</div>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							color: 'black',
							fontFamily: '',
							fontSize: '16px',
							fontFamily: 'sans-serif',
							paddingLeft: '30px'
						}}>
						Conversation
					</Typography>
					<Typography
						variant="h6"
						noWrap
						component="div"
						onClick={() => navigate('/deals')}
						sx={{
							color: 'black',
							fontFamily: '',
							fontSize: '16px',
							fontFamily: 'sans-serif',
							paddingLeft: '30px'
						}}>
						Deals
					</Typography>

					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							color: 'black',
							fontFamily: '',
							fontSize: '16px',
							fontFamily: 'sans-serif',
							paddingLeft: '30px'
						}}>
						Reports
					</Typography>

					<div onClick={() => setOpen(!open)} style={{ marginLeft: '60%' }}>
						<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
					</div>
					<div className="menu-container">
						<div className="menu-trigger"></div>
						<div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
							<div className="profile-image">
								<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

								<h3>
									Abeesh
									<br />
									<span>abiabeesh@gmail.com</span>
								</h3>
							</div>
							<ul>
								<li className="dropdownItem">
									<AccountCircleIcon />
									<p>Account</p>
								</li>
								<li className="dropdownItem">
									<AccountCircleIcon />
									<p>General</p>
								</li>
								<li className="dropdownItem">
									<AccountCircleIcon />
									<p>Notification</p>
								</li>
								<li className="dropdownItem">
									<AccountCircleIcon />
									<p>Privacy</p>
								</li>
								<li className="dropdownItem">
									<AccountCircleIcon />
									<p>setting</p>
								</li>
							</ul>
							<div className="sign-out">
								<h3 className="logout" onClick={() => signOutHandler()}>
									Sign out
								</h3>
							</div>
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Header;
