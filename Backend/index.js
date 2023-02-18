import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import  userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'
import { error } from 'console';
import errorHandler from './middleware/errorMiddleware.js';

const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())


dotenv.config()

app.use(cors());
connectDB();
app.use(express.static('public')); 
app.use('/public', express.static('public'));
const PORT = process.env.PORT || 8000;

app.use('/',userRouter) 
app.use('/admin', adminRouter)

app.use(errorHandler)
app.listen(PORT, () => {console.log(`server running on port:${PORT}`);
});
