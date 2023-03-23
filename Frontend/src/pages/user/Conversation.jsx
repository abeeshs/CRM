import {
	Avatar,
	Collapse,
	IconButton,
	InputBase,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material';
import { Box } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react';
import Header from '../../components/User/Header/Header';
import Chat from '../../components/User/ChatBox/Chat';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import * as chatService from '../../services/chatService';
import Loading from '../../components/Extra Components/Loading/Loading';

function Conversation() {
	
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedChat, setSelectedChat] = useState();
	const [chats, setChats] = useState([]);
	const [fetchAgain, setFetchAgain] = useState(false);
	const [loggedUser, setLoggedUser] = useState();

	const getAllChats = async () => {
		try {
			const response = await chatService.getChatService();

			if (response.status === 'success') {
				setChats(response.allChats);
			}
		} catch (err) {
			toast.error('something went wrong');
		}
	};

	useEffect(() => {
		getAllChats();
		const user = JSON.parse(localStorage.getItem('user'));
		setLoggedUser(user.user);
	}, []);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleSearch = async () => {
		if (!search) {
			toast.error('please enter text');
		}
		try {
			setLoading(true);
			const response = await chatService.searchUserService(search);
			console.log(response);
			if (response.status === 'success') {
				console.log(response);
				setLoading(false);
				setSearchResult(response.user);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const accessChat = async (userId) => {
		try {
			console.log({ userId });
			const response = await chatService.createChatService(userId);
			console.log(userId);
			if (response.status === 'success') {
				if (!chats.find((c) => c._id === response.createdChat._id))
					setSelectedChat(response.createdChat);
				setChats((state) => [...state, response.createdChat]);
			}
		} catch (err) {
			toast.error('Something went wrong');
		}
	};
	const getSender = (loggedUser, users) => {
		console.log(loggedUser, users)
		return users[0]._id === loggedUser._id ? users[1].username : users[0].name;
	};
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
						<ListItemButton sx={{ backgroundColor: '#EAF0F6' }}>
							<ListItemIcon></ListItemIcon>
							<ListItemText primary="Chat" />
						</ListItemButton>

						<ListItemButton onClick={handleClick}>
							<ListItemIcon></ListItemIcon>
							<ListItemText primary="Users" />
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<List component="div">
								<Box sx={{ border: '1px solid grey', m: 1 }}>
									<InputBase
										sx={{ ml: 1, flex: 1 }}
										placeholder="Search contact"
										inputProps={{ 'aria-label': 'search ' }}
										onChange={(e) => {
											setSearch(e.target.value);
										}}
									/>
									<IconButton
										onClick={handleSearch}
										type="button"
										sx={{ p: '1px' }}
										aria-label="search">
										<SearchIcon />
									</IconButton>
								</Box>
							</List>
							{loading ? (
								<Loading />
							) : (
								searchResult?.map((item) => {
									return (
										<List key={item._id} component="div" disablePadding>
											<ListItemButton sx={{ pl: 4 }} onClick={() => accessChat(item._id)}>
												<ListItemIcon>
													<Avatar />
												</ListItemIcon>
												<ListItemText primary={item?.username} />
											</ListItemButton>
										</List>
									);
								})
							)}
						</Collapse>
					</List>
				</Box>
				<Box
					sx={{
						width: '20%',
						border: '1px solid rgb(223, 227, 235)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
					<Box
						sx={{
							width: '100%',
							height: '50px',
							alignContent: 'center',
							boxSizing: 'border-box',
							border: '1px solid rgb(223, 227, 235)'
						}}>
						<Typography
							className="commen-font"
							sx={{ textAlign: 'center', p: 2, color: '#33475b', fontWeight: 600 }}>
							Chats
						</Typography>
					</Box>
					{chats?.map((item) => {
						return (
							<Box
								key={item._id}
								onClick={() => setSelectedChat({...item,name:getSender(loggedUser, item.users)})}
								sx={{
									width: '95%',
									height: '50px',
									alignContent: 'center',
									backgroundColor: 'rgb(229, 245, 248)',
									boxSizing: 'border-box',
									border: '1px solid rgb(223, 227, 235)',
									borderRadius: '5px',
									m: 1,
									textAlign:'center'
								}}>
								<Typography className="commen-font" sx={{ p: 2, color: '#33475b' }}>
									{item.isGroupChat ? getSender(loggedUser, item.users) : item.chatName}
								</Typography>
							</Box>
						);
					})}
				</Box>
				<Chat
					selectedChat={selectedChat}
					setSelectedChat={setSelectedChat}
					fetchAgain={fetchAgain}
					setFetchAgain={setFetchAgain}
				/>
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
