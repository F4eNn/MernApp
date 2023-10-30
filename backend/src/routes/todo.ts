import { Router } from 'express';
import { postTodo, getTodo } from '../controllers/todo';
import { body } from 'express-validator';

export const router = Router();

router.post(
	'/todo',
	body('todo')
		.trim()
		.not()
		.isEmpty()
		.withMessage("Can't be empty.")
		.isLength({ min: 3 })
		.withMessage('Min. 3 characters.'),
	postTodo,
);
router.get('/todo', getTodo);
