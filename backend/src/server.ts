import 'dotenv/config';
import express from 'express';

import mongoose from 'mongoose';

import {router as authRouter} from './routes/todo';

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.lhyndcn.mongodb.net/todo-app?retryWrites=true&w=majority`;

const server = express();

server.use(authRouter);

mongoose
	.connect(MONGO_URI)
	.then(result => server.listen(process.env.PORT || 8080))
	.catch(err => console.log(err));
