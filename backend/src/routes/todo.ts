import { Router } from 'express';

import { postTodo, getTodo } from '../controller/todo';
import { body } from 'express-validator';

export const router = Router();

router.post(
	'/todo',
	body('title')
		.trim()
		.not()
		.isEmpty()
		.withMessage("Can't be empty.")
		.isLength({ min: 3 })
		.withMessage('Min. 3 characters.')
		.isAlphanumeric()
		.withMessage('Input must contain only digits and letters.'),
	postTodo,
);
router.get('/todo', getTodo);
