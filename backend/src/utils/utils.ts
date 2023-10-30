import type { Response, Request } from 'express';
import { Result, validationResult as validationErrors } from 'express-validator';

export const validationResult = (req: Request, res: Response) => {
	const errors: Result = validationErrors(req);
	if (!errors.isEmpty()) {
		const { msg, path } = errors.mapped().todo;
		return res.status(422).json({ msg, path });
	}
};
