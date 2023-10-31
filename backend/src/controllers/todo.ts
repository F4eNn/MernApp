import { NextFunction, Request, Response } from 'express';
import { Todo, TodoType } from '../models/todo';
import { CustomError } from '../models/custom-error';
import { validationResult } from '../utils/utils';

export const postTodo = async (req: Request, res: Response, next: NextFunction) => {
	if (validationResult(req, res)) return;
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

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
	const todoID = req.params.todoID;
	const newTitle = req.body.todo;

	if (validationResult(req, res)) return;

	try {
		const todo: TodoType | null = await Todo.findById(todoID);
		if (!todo) {
			throw new CustomError("Todo doesn't exist", 404);
		}
		todo.todo = newTitle;
		await todo.save();
		return res.status(200).json({ message: 'Updated successfully!' });
	} catch (error) {
		if (error instanceof CustomError) {
			next(error);
		} else {
			next(new CustomError("Couldn't update todo", 500));
		}
	}
};
