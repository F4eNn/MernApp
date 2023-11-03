import { NextFunction, Request, Response } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
	const user = req.userID;
	if (user) {
		return res.json({ loggedIn: true });
	}
	res.json({ loggedIn: false });
};
