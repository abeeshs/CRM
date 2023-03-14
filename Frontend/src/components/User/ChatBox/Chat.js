import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import ForumIcon from '@mui/icons-material/Forum';
function Chat() {
	return (
		<Box className="chat-container" sx={{ width: '40%', border: '1px solid rgb(223, 227, 235)' }}>
			<Box
				className="chat-header"
				sx={{ height: '50px', width: '100%', border: '1px solid rgb(223, 227, 235)' }}>
				<span style={{ paddingLeft: '15px' }} className="commen-font">
					Owner
				</span>
				<Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
					<span style={{ color: 'grey' }}>
						<AccountCircle />
					</span>
					<span className="sub-heading">Abeesh</span>
				</Box>
			</Box>
			<Box className="messages">
				<div>
					<div className="message parker">hiiiii</div>
					<div className="message stark">hiiiii</div>
					<div></div>
				</div>
			</Box>
			<Box className="chat-footer">
				<Box className="chat-footer-head">
					<Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
						<span style={{ fontSize: '2px' }}>
							<ForumIcon />
						</span>
						<span className="dark-heading">Chat</span>
					</Box>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<TextField
						id="outlined-basic"
						placeholder="Write a message"
						fullWidth
						variant="outlined"
					/>
					<Button className="deal-btn" sx={{ backgroundColor: '#33475b' }} variant="contained">
						send
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export default Chat;
