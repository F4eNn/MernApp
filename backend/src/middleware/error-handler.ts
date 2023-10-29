import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../models/custom-error';

export const handleError = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
	let customErr = err;
	if (!(err instanceof CustomError)) {
		customErr = new CustomError('test', 404, 'hmm');
	}
	res.status((customErr as CustomError).status).send(customErr);
};
