import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import { error } from 'console';
import errorHandler from './middleware/errorMiddleware.js';
import { Server } from 'socket.io';


const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();

app.use(cors());
connectDB();
app.use(express.static('public'));
app.use('/public', express.static('public'));
const PORT = process.env.PORT || 8000;

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.use(errorHandler);
const server = app.listen(PORT, () => {
	console.log(`server running on port:${PORT}`);
});

const io = new Server(server, {
	pingTimeout: 60000,
	cors: {
		origin: 'http://localhost:3000'
	}
});

io.on('connection', (socket) => {
	console.log('connected to socket.io');

	socket.on('setup', (userData) => {
		socket.join(userData._id);
		console.log(userData._id);
		socket.emit('connected');
	});
	socket.on('join chat', (room) => {
		socket.join(room);
		console.log('User joined Room:' + room);
	});

	socket.on('typing', (room) => socket.in(room).emit('typing'));
	socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

	socket.on('new message', (newMessageReceived) => {
		var chat = newMessageReceived.chat;
		if (!chat.users) return console.log('chat.users not defined');

		//sending message except the sender
		chat.users.forEach((user) => {
			if (user._id == newMessageReceived.sender._id) return;
			socket.in(user._id).emit('message received', newMessageReceived);
		});
	});
});
