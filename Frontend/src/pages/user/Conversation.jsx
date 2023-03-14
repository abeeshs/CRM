import { Avatar, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';

import React from 'react';
import Header from '../../components/User/Header/Header';
import Chat from '../../components/User/ChatBox/Chat';

function Conversation() {
	return (
		<>
			<Header />
			<Box
				sx={{
					height: '70px',
					border: '1px solid rgb(223, 227, 235)',
					display: 'flex',
					alignItems: 'center'
				}}>
				<Box sx={{ padding: '55px' }}>
					<p className="page-heading">Conversation</p>
				</Box>
			</Box>
			<Box
				sx={{
					height: '78vh',
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
				<Box sx={{ width: '17%', border: '1px solid rgb(223, 227, 235)' }}>
					<List>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText primary="Inbox" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton component="a" href="#simple-list">
								<ListItemText primary="More" />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
				<Box sx={{ width: '20%', border: '1px solid rgb(223, 227, 235)' }}>
					<Box
						sx={{
							width: '100%',
							height: '50px',
							alignContent: 'center',
							backgroundColor: 'rgb(229, 245, 248)',
							boxSizing: 'border-box'
						}}>
						<Typography
							className="commen-font"
							sx={{ textAlign: 'center', p: 2, color: '#33475b', fontWeight: 600 }}>
							Contacts
						</Typography>
					</Box>
				</Box>
				<Chat />
				<Box sx={{ width: '23%', border: '1px solid rgb(223, 227, 235)' }}>
					<Box sx={{ height: '80px', width: '100%', borderBottom: '1px solid rgb(223, 227, 235)' }}>
						<Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
							<Avatar />
							<span style={{ paddingLeft: '10px' }} className="sub-heading">
								Arjun E
							</span>
						</Box>
					</Box>
					<Box className="contact-info">
						<Box>
							<span>Email</span>
							<p>Email</p>
						</Box>
						<Box>
							<span>Phone Number</span>
							<p>Email</p>
						</Box>
						<Box>
							<span>Contact Owner</span>
							<p>Email</p>
						</Box>
						<Box>
							<span>Life Cycle Stage</span>
							<p>Email</p>
						</Box>
						<Box>
							<span>Lead Status</span>
							<p>Email</p>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default Conversation;
