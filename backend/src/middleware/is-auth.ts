import type { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomError } from '../models/custom-error';

declare global {
	namespace Express {
		interface Request {
			userID?: string;
		}
	}
}
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return next(new CustomError('Not authenticated', 401));
	}
	const token = authHeader.split(' ')[1];
	let decodedToken: JwtPayload | string;

	try {
		decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
	} catch (err) {
		return next(new CustomError('Decoded token failed', 401, 'Not authenticated'));
	}

	if (!decodedToken) {
		return next(new CustomError('Decoded token failed', 401, 'Not authenticated'));
	}
	if (typeof decodedToken === 'string') {
		return next(new CustomError('Invalid Token', 422, 'Not authenticated'));
	}
	req.userID = decodedToken.userID;
	next()
};
