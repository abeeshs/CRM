import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

const app = express();
app.use(cors());
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`server running on port:${PORT}`);
});
