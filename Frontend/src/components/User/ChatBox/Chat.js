import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ForumIcon from '@mui/icons-material/Forum';
import * as chatService from '../../../services/chatService';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:8000';
var socket;
var selectedChatCompare;
// /const socket = io.connect('http://localhost:3001');

function Chat({ selectedChat, setSelectedChat, fetchAgain, setFetchAgain }) {
	console.log({ selectedChat });
	const user = useSelector((state) => state.userAuth.user);
	//console.log(user);

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit('setup', user);
		socket.on('connected', () => {
			setSocketConnected(true);
		});
	}, []);

	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [socketConnected, setSocketConnected] = useState(false);
	const [typing,setTyping]=useState(false)
	const [isTyping,setIsTyping]=useState(false)


	const getAllMessages = async () => {
		try {
			console.log(selectedChat._id)
			setLoading(true);
			const response = await chatService.getMessageService(selectedChat._id);
			console.log(response)
			console.log(messages)
			setLoading(false);
			socket.emit('join chat', selectedChat._id);
			if (response.status &&response.status === "success") {
				setMessages(response.messages);
				//socket.emit('join chat', selectedChat._id);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const typingHandler = (e) => {
		setNewMessage(e.target.value);
	};

	const sendMesage = async (e) => {
		try {
			if (e.key === 'Enter' && newMessage) {
				setNewMessage('');
				const data = {
					content: newMessage,
					chatId: selectedChat._id
				};
				const response = await chatService.sendMessageService(data);
				console.log(response);
				if (response.status === 'success') {
					console.log(messages);
					if (messages.length > 0) {
						console.log('/////////////////');
						setMessages((state) => [...state, response.message]);
					} else {
						console.log('*************');
						setMessages([response.message]);
					}
					console.log({ messages });
				}
				socket.emit('new message', response.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllMessages();
		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	useEffect(() => {
		socket.on('message received', (newMessageReceived) => {
			if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
				//show notification
			} else {
				setMessages([...messages, newMessageReceived]);
			}
		});
	});
	return (
		<>
			{selectedChat ? (
				<Box
					className="chat-container"
					sx={{ width: '40%', border: '1px solid rgb(223, 227, 235)' }}>
					<Box
						className="chat-header"
						sx={{ height: '50px', width: '100%', border: '1px solid rgb(223, 227, 235)',display:'flex',textAlign:'center' }}>
						
						<Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
							<span style={{ color: 'grey' }}>
								<AccountCircle />
							</span>
							<span className="sub-heading">{selectedChat.name}</span>
						</Box>
					</Box>
					<Box className="messages">
						{loading ? (
							<Box
								sx={{
									height: '100%',
									display: 'flex',
									color: 'grey',
									alignItems: 'center',
									justifyContent: 'center'
								}}>
								<CircularProgress color="inherit" />
							</Box>
						) : (
							messages?.map((e) => {
								return (
									<div key={e._id}>
										<div className={e.sender._id === user._id ? 'message parker' : 'message stark'}>
											{e.contend}
										</div>
										{/* <div className="message stark">hiiiii</div> */}
										<div></div>
									</div>
								);
							})
						)}
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
							<FormControl fullWidth onKeyDown={sendMesage}>
								<TextField
									onChange={typingHandler}
									id="outlined-basic"
									placeholder="Write a message"
									fullWidth
									variant="outlined"
									value={newMessage}
								/>
							</FormControl>
							<Button className="deal-btn" sx={{ backgroundColor: '#33475b' }} variant="contained">
								send
							</Button>
						</Box>
					</Box>
				</Box>
			) : (
				<Box
					className="chat-container"
					sx={{
						width: '40%',
						border: '1px solid rgb(223, 227, 235)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					<Typography fontFamily="Work sans" fontSize="20px" color="grey">
						Click on User to start chatting
					</Typography>
				</Box>
			)}
		</>
	);
}

export default Chat;
