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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
	const navigate = useNavigate();
	const [tableType, setTableType] = useState('');

	const tableHandle = (type) => {
		setTableType(type);
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
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Header;
