import type { NextFunction, Request, Response } from 'express';
import { Todo, TodoType } from '../models/todo';
import { CustomError } from '../models/custom-error';
import { validationResult } from '../utils/utils';

const updateTodo = async (todoID: string, newTodo?: string, isDone?: boolean) => {
	const todo: TodoType | null = await Todo.findById(todoID);
	if (!todo) {
		throw new CustomError("Todo doesn't exist", 404, 'Could not update todo');
	}
	if (newTodo) {
		todo.todo = newTodo;
	} else if (isDone !== undefined) {
		todo.isDone = isDone ? false : true;
	}
	await todo.save();
};

export const postTodo = async (req: Request, res: Response, next: NextFunction) => {
	const { todoID, isDone, todo: newTitle } = req.body;
	if (newTitle) {
		if (validationResult(req, res)) return;
	}
	try {
		if (todoID ) {
			await updateTodo(todoID, newTitle, isDone);
			return res.status(200).json({ message: 'Updated successfully!', ok: true });
		}
		// checks if sent todo as undefined which is empty string
		if (newTitle === '') {
			return res.status(422).json({ errorMsg: "Can't be empty", path: 'todo' });
		}
		const todo = new Todo({ todo: newTitle, isDone: false });
		await todo.save();
		return res.status(201).json({ message: 'Created Todo' });
	} catch (error) {
		console.log(error);
		if (error instanceof CustomError) {
			return next(error);
		}
		const err = new CustomError("Can't add or update todo", 500, 'server issue');
		next(err);
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

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
	const todoID = req.body.todoID;
	try {
		const todo = await Todo.findByIdAndDelete(todoID);
		if (!todo) {
			throw new CustomError("Todo doesn't exist", 404, 'Could not delete todo');
		}
		res.status(200).json({ message: 'Delete successfully', ok: true });
	} catch (error) {
		console.log();
		if (error instanceof CustomError) {
			return next(error);
		}
		next(error);
	}
};
