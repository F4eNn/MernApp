import { useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Item } from '../components/tasks/Item';

import { createTodos, getTodos } from '../utils/todos';
import { Label } from '../components/ui/Label';
import { FormControl } from '../components/ui/FormControl';
import { ErrorMsg } from '../components/ui/ErrorMsg';
import { TodoItems } from '../types/types';

type ResultType = {
	errorMsg: string;
	path: string;
	ok: boolean;
};

export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	const todo = Object.fromEntries(formData);
	const result: ResultType = await createTodos(todo);
	let error: string;
	if (!result.ok) {
		error = result.errorMsg;
		return error;
	}
	return redirect('/');
}

export async function loader() {
	const todos = await getTodos();
	return todos;
}

const Index = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const error = useActionData() as string;
	const { data } = useLoaderData() as TodoItems;
	const submit = () => {
		if(inputRef.current){
			console.log(inputRef.current.value);
			inputRef.current.value = ''
		}
	};
	return (
		<>
			<Card id='progress'>
				<h1 className='text-2xl font-[500]'>Your Tasks</h1>
			</Card>
			<Card id='tasks' className='mt-10 py-8'>
				<Form method='POST' className='flex gap-5' onSubmit={submit}>
					<FormControl>
						<Label title='' htmlFor='createTodo' />
						<Input
							ref={inputRef}
							className='py-3'
							id='createTodo'
							placeholder='Add your todo'
							name='todo'
							defaultValue={'sad'}
						/>
						<ErrorMsg errorMsg={error} />
					</FormControl>
					<Button type='submit' title='Add' className='w-[100px] rounded-md' />
				</Form>
				<Form className='mt-8'>
					<ul className='space-y-5'>
						{data.length > 0 ? (
							data.map(({ _id, todo }) => {
								return <Item key={_id} todo={todo} />;
							})
						) : (
							<li className='flex justify-center'>
								<i>Create your first todo</i>
							</li>
						)}
					</ul>
				</Form>
			</Card>
		</>
	);
};

export default Index;
