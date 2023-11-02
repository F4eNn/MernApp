import { Router } from 'express';
import { createUser, login } from '../controllers/auth';
import { body } from 'express-validator';
import { User } from '../models/user';

export const router = Router();

const validateAuth = [
	body('email')
		.isEmail()
		.withMessage("It's not valid email.")
		.normalizeEmail()
		.custom(async (value) => {
			const user = await User.findOne({ email: value });
			if (user) {
				return Promise.reject('User already exists!');
			}
			return true;
		}),
	body('password')
		.trim()
		.not()
		.isEmpty()
		.withMessage("Can't be empty")
		.isLength({ min: 3 })
		.withMessage('Min. 3 characters.')
		.custom((value, { req }) => {
			return value === req.body.confirmPassword;
		})
		.withMessage("Password don't match"),
];

router.post('/signup', validateAuth, createUser);
router.post('/login', login)