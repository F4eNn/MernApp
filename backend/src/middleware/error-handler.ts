import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../models/custom-error';

export const handleError = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
	let customErr = err;
	if (!(err instanceof CustomError)) {
		customErr = new CustomError('We are having troubles', 500, 'Please try again later');
	}
	res.status((customErr as CustomError).status).send(customErr);
};
