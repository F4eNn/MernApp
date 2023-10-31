import { Router } from 'express';
import { postTodo, getTodo } from '../controllers/todo';
import { body } from 'express-validator';

export const router = Router();

const validateTodo = [
	body('todo')
		.trim()
		.not()
		.isEmpty()
		.withMessage("Can't be empty.")
		.isLength({ min: 3 })
		.withMessage('Min. 3 characters.'),
];

router.put('/todo', validateTodo, postTodo);

router.get('/todo', getTodo);
