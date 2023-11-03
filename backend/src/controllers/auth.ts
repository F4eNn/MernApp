import type { NextFunction, Request, Response } from 'express';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User, UserModelType } from '../models/user';
import { validationResult } from '../utils/utils';
import { CustomError } from '../models/custom-error';

const TOKEN = `${process.env.TOKEN_KEY}`;

const addToken = (email: string, _id: string) => {
	const token = jwt.sign({ email: email, userID: _id }, TOKEN, { expiresIn: '2h' });
	return token;
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	try {
		if (validationResult(req, res)) return;

		const hashedPassword = await hash(password, 12);

		const newUser: UserModelType = new User({ email, password: hashedPassword });
		const { email: userEmail, _id } = await newUser.save();
		const token = addToken(userEmail, _id.toString());
		res.status(201).json({ message: 'created user', token, email });
	} catch (error) {
		if (error instanceof CustomError) {
			return next(error);
		}
		next(error);
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new CustomError("Account doesn't exist", 404);
		}
		const isEqual = await compare(password, user.password);
		if (!isEqual) {
			throw new CustomError('Invalid credentials', 401);
		}
		const token = addToken(email, user._id.toString());
		res.status(200).json({ message: 'Successfully login', email, token });
	} catch (error) {
		if (error instanceof CustomError) {
			return next(error);
		}
		next(error);
	}
};
