import type { Response, Request } from 'express';
import { Result, validationResult as validationErrors } from 'express-validator';

export const validationResult = (req: Request, res: Response) => {
	const errors: Result = validationErrors(req);
	if (!errors.isEmpty()) {
		const { msg, path } = errors.mapped().todo;
		res.status(422).json({ errorMsg:msg, path });
		return true;
	}
	return false;
};
