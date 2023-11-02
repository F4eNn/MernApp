import { ReactNode } from 'react';

export type PropsWithChildren = {
	children: ReactNode;
};

export type TodoItem = {
	_id: string;
	todo: string;
	isDone: boolean;
};
export type TodoItems = {
	data: TodoItem[];
};

export type ResultType = { error: { [k: string]: { msg: string; path: string } }; ok: boolean };
