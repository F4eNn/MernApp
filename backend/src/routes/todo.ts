import { Router } from 'express';
import { postTodo, getTodo, deleteTodo } from '../controllers/todo';
import { body } from 'express-validator';
import { isAuth } from '../middleware/is-auth';

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

router.put('/todo', isAuth, validateTodo, postTodo);

router.get('/todo',isAuth, getTodo);

router.delete('/todo', isAuth, deleteTodo);
