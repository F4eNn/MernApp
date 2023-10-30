import { Router } from 'express';
import { postTodo, getTodo, updateTodo } from '../controllers/todo';
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

router.post('/todo', validateTodo, postTodo);

router.get('/todo', getTodo);

router.put('/todo/:todoID', validateTodo, updateTodo);
