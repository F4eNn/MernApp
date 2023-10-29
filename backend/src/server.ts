import 'dotenv/config';
import bodyParser from 'body-parser';

import express from 'express';
import mongoose from 'mongoose';

import { router as todoRouter } from './routes/todo';
import { handleError } from './middleware/error-handler';

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.lhyndcn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const server = express();

server.use(bodyParser.json());

server.use(todoRouter);

server.use(handleError);

mongoose
	.connect(MONGO_URI)
	.then(result => server.listen(process.env.PORT || 8080))
	.catch(err => console.log(err));
