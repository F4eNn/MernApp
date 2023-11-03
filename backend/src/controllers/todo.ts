import type { NextFunction, Request, Response } from 'express';
import { Todo, TodoType } from '../models/todo';
import { CustomError } from '../models/custom-error';
import { validationResult } from '../utils/utils';
import { User } from '../models/user';

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
		if (todoID) {
			const user = await User.findById('6544dc7fe6dad3f6fc0a8e4c');
			if (!(user?._id.toString() === req.userID)) {
				res.status(401).json({ status: 401 });
				return new CustomError("Can't update todo", 401, 'User not found with relevant ID');
			}
			await updateTodo(todoID, newTitle, isDone);
			return res.status(200).json({ message: 'Updated successfully!', ok: true });
		}
		// checks if sent todo as undefined which is empty string
		if (newTitle === '') {
			return res.status(422).json({ error: { todo: { msg: "Can't be empty" } }, path: 'todo' });
		}
		const todo = new Todo({ todo: newTitle, isDone: false, creator: req.userID });
		await todo.save();
		const creator = await User.findById(req.userID);
		if (!creator) {
			return new CustomError("Can't add todo", 401, 'User not found with relevant ID');
		}
		creator.todos.push(todo._id);
		await creator.save();
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
		const creatorTodos = await User.findById(req.userID).populate('todos');
		const todosArr = creatorTodos?.todos;
		console.log(todosArr);
		res.status(200).json({ data: todosArr });
	} catch (error) {
		next(new CustomError('Not found any todos', 404));
	}
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
	const todoID = req.body.todoID;
	try {
		const todo = await Todo.findById(todoID);
		if (!todo) {
			throw new CustomError("Todo doesn't exist", 404, 'Could not delete todo');
		}
		if (todo.creator?.toString() !== req.userID) {
			throw new CustomError('Not allowed to delete this todo', 401);
		}
		await Todo.findByIdAndDelete(todoID);
		await User.findByIdAndUpdate(req.userID, { $pull: { todos: todoID } });

		res.status(200).json({ message: 'Delete successfully', ok: true });
	} catch (error) {
		if (error instanceof CustomError) {
			return next(error);
		}
		next(error);
	}
};
