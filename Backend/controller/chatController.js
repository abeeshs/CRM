import asyncHandler from 'express-async-handler';
import * as chatService from '../services/chatService.js';

//------------ Start a new chat or open existing chat
export const createChat = asyncHandler(async (req, res, next) => {
	const { userId } = req.body;

	if (!userId) {
		console.log('no userId');
	}
	const isChat = await chatService.getExistChat(userId, req.user._id);

	if (isChat.length > 0) {
		res.json({ createdChat: isChat[0], message: 'Chat exist', status: 'success' });
	} else {
		const chatData = {
			chatName: 'sender',
			isGroupChat: false,
			users: [req.user._id, userId]
		};

		const createdChat = await chatService.createChatService(chatData);

		if (createdChat) {
			res.status(200).json({ createdChat, status: 'success' });
		} else {
			throw new Error('Somethin went wrong');
		}
	}
});

//--------------- Fetch all Chats of the user -----------

export const getchats = asyncHandler(async (req, res) => {
	//get allchats
	const allChats = await chatService.getUserAllChat(req.user._id);

	if (allChats.length > 0) {
		res.status(200).json({ status: 'success', allChats });
	} else {
		throw new Error('something went wrong');
	}
});

//--------------- search  user for chat -----------
export const searchUser = asyncHandler(async (req, res, next) => {
	const keyword = req.query?.search
		? {
				$or: [
					{ username: { $regex: req.query.search, $options: 'i' } },
					{ email: { $regex: req.query.search, $options: 'i' } }
				]
		  }
		: {};

	const user = await chatService.searchUserService(req.user._id, keyword);
	if (user && user.length > 0) {
		res.status(200).json({ status: 'success', user });
	} else {
		throw new Error('no users found');
	}
});

//--------------- send message -----------
export const sendMessage = asyncHandler(async (req, res, next) => {
	const { content, chatId } = req.body;

	if (!content || !chatId) {
		throw new Error('Invalid data passed');
	} else {
		var newMessage = {
			sender: req.user._id,
			contend: content,
			chat: chatId
		};

		const message = await chatService.sendMessageServise(newMessage);

		if (message) {
			res.status(200).json({ status: 'success', message });
		}
	}
});

//--------- Get all messages of specific chat --------
export const allMessage = asyncHandler(async (req, res, next) => {
	const chatId = req.params.chatId;

	if (!chatId) {
		console.log('chat id is missing');
		throw new Error('Something went wrong');
	} else {
		const messages = await chatService.getMessageService(chatId);

		if (messages.length > 0) {
			res.status(200).json({ status: 'success', messages });
		} else {
			throw new Error('No messages found');
		}
	}
});
