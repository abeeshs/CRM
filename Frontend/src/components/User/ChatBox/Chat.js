import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar, Box, Button, FormControl, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ForumIcon from '@mui/icons-material/Forum';
import * as chatService from '../../../services/chatService';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import dayjs from 'dayjs';
import './Chat.css';
const ENDPOINT = 'http://localhost:8000';
var socket;
var selectedChatCompare;

function Chat({ selectedChat, setSelectedChat, fetchAgain, setFetchAgain }) {
	const user = useSelector((state) => state.userAuth.user);
	const [socketConnected, setSocketConnected] = useState(false);
	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit('setup', user);
		socket.on('connected', () => setSocketConnected(true));
		socket.on('typing', () => setIsTyping(true));
		socket.on('stop typing', () => setIsTyping(false));
	}, []);

	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const [typing, setTyping] = useState(false);
	const [isTyping, setIsTyping] = useState(false);

	const getAllMessages = async () => {
		try {
			setLoading(true);
			const response = await chatService.getMessageService(selectedChat._id);
			setLoading(false);
			socket.emit('join chat', selectedChat._id);
			if (response.status && response.status === 'success') {
				setMessages(response.messages);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const typingHandler = (e) => {
		setNewMessage(e.target.value);
		if (!socketConnected) return;
		if (!typing) {
			setTyping(true);
			socket.emit('typing', selectedChat._id);
		}
		let lastTypingTime = new Date().getTime();
		let timerLength = 3000;
		setTimeout(() => {
			var timeNow = new Date().getTime();
			var timeDiff = timeNow - lastTypingTime;
			if (timeDiff >= timerLength && typing) {
				socket.emit('stop typing', selectedChat._id);
				setTyping(false);
			}
		}, timerLength);
	};
	// const scroll = useRef(null);

	// scroll.current.scrollIntoView({
	// 	behavior: 'smooth'
	// });

	const sendMesage = async (e) => {
		try {
			if (e.key === 'Enter' && newMessage) {
				socket.emit('stop typing', selectedChat._id);
				setNewMessage('');
				const data = {
					content: newMessage,
					chatId: selectedChat._id
				};
				const response = await chatService.sendMessageService(data);
				if (response.status === 'success') {
					if (messages.length > 0) {
						setMessages((state) => [...state, response.message]);
					} else {
						setMessages([response.message]);
					}
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
						sx={{
							height: '50px',
							width: '100%',
							border: '1px solid rgb(223, 227, 235)',
							display: 'flex',
							textAlign: 'center'
						}}>
						<Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
							<span style={{ color: 'grey' }}>
								<AccountCircle />
							</span>
							<span className="sub-heading">{selectedChat.user.username}</span>
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
									<div>
										<div className="msg-contend" key={e._id}>
											{e.sender._id === user._id ? (
												''
											) : (
												<div className="userdp">
													<Avatar />
													{/* <div className={e.sender._id === user._id ? 'r-time' : 'l-time'}>{dayjs(e.createdAt).format('LT')}</div> */}
												</div>
											)}
											<div
												className={e.sender._id === user._id ? 'message parker' : 'message stark'}>
												{e.contend}
											</div>
										</div>
										<div className={e.sender._id === user._id ? 'r-time' : 'l-time'}>
											{dayjs(e.createdAt).format('LT')}
										</div>
									</div>
								);
							})
						)}
						<div>
							{isTyping ? (
								<div className="message stark">
									<div className="typing typing-1"></div>
									<div className="typing typing-2"></div>
									<div className="typing typing-3"></div>
								</div>
							) : (
								''
							)}
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
