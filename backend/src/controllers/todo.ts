import { NextFunction, Request, Response } from 'express';
import { Todo } from '../models/todo';
import { CustomError } from '../models/custom-error';
import { validationResult, Result } from 'express-validator';

export const postTodo = async (req: Request, res: Response, next: NextFunction) => {
	const errors: Result = validationResult(req);
	if (!errors.isEmpty()) {
		const { msg, path } = errors.mapped().todo;
		return res.status(422).json({ errorMsg: msg, path });
	}
	const todo = new Todo({ todo: req.body.todo });
	try {
		await todo.save();
		return res.status(201).json({ message: 'Created Todo' });
	} catch (err) {
		const error = new CustomError("Can't add todo", 500, 'server issue');
		next(error);
	}
};

export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const todos = await Todo.find();
		res.status(200).json({ data: todos });
	} catch (error) {
		next(new CustomError('Not found any todos', 404));
	}
};
