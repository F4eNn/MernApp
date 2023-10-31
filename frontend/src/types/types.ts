import { ReactNode } from 'react';

export type PropsWithChildren = {
	children: ReactNode;
};

export type TodoItem = {
	_id: string;
	todo: string;
};
export type TodoItems = {
	data: TodoItem[];
};
