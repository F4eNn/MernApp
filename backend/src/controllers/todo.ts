import { NextFunction, Request, Response } from 'express';
import { Todo, TodoType } from '../models/todo';
import { CustomError } from '../models/custom-error';
import { validationResult } from '../utils/utils';

const updateTodo = async (todoID: string, newTodo: string) => {
	const todo: TodoType | null = await Todo.findById(todoID);
	if (!todo) {
		throw new CustomError("Todo doesn't exist", 404);
	}
	todo.todo = newTodo;
	await todo.save();
};

export const postTodo = async (req: Request, res: Response, next: NextFunction) => {
	if (validationResult(req, res)) return;
	const todoID = req.body.todoID;
	const newTitle = req.body.todo;
	try {
		if (todoID) {
			await updateTodo(todoID, newTitle);
			return res.status(200).json({ message: 'Updated successfully!', ok: true });
		}
		const todo = new Todo({ todo: newTitle });
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
