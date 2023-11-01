import type { NextFunction, Request, Response } from 'express';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User, UserModelType } from '../models/user';
import { validationResult } from '../utils/utils';
import { CustomError } from '../models/custom-error';


const TOKEN = `${process.env.TOKEN_KEY}`;

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	try {
		if (validationResult(req, res)) return;

		const hashedPassword = await hash(password, 12);

		const newUser: UserModelType = new User({ email, password: hashedPassword });
		const { email: userEmail, _id } = await newUser.save();
		const token = jwt.sign({ email: userEmail, userID: _id.toString() }, TOKEN, { expiresIn: '2h' });

		res.status(201).json({ message: 'created user', token });
	} catch (error) {
		if (error instanceof CustomError) {
			return next(error);
		}
		next(error);
	}
};

