import { Card } from '../components/ui/Card';
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Item } from '../components/tasks/Item';

import { createTodos, deleteTodo, getTodos } from '../utils/todos';
import { Label } from '../components/ui/Label';
import { FormControl } from '../components/ui/FormControl';
import { ErrorMsg } from '../components/ui/ErrorMsg';
import { ResultType, TodoItems } from '../types/types';

export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	const { todo, intent, todoID } = Object.fromEntries(formData);
	const todoForm = document.getElementById('todoForm') as HTMLFormElement;
	let error: string;

	if (intent === 'create-todo') {
		const result: ResultType = await createTodos(todo);
		if (!result.ok) {
			error = result.errorMsg;
			return error;
		}
		todoForm.reset();
	}
	if (intent === 'delete-todo') {
		await deleteTodo(todoID);
	}
	return redirect('/');
}

export async function loader() {
	const todos = await getTodos();
	return todos;
}

const Index = () => {
	const error = useActionData() as string;
	const { data } = useLoaderData() as TodoItems;
	return (
		<>
			<Card id='progress'>
				<h1 className='text-2xl font-[500]'>Your Tasks</h1>
			</Card>
			<Card id='tasks' className='mt-10 py-8'>
				<Form id='todoForm' method='POST' className='flex gap-5'>
					<FormControl>
						<Label title='' htmlFor='createTodo' />
						<Input className='py-3' id='createTodo' placeholder='Add your todo' name='todo' />
						<ErrorMsg errorMsg={error} />
					</FormControl>
					<Button name='intent' value='create-todo' type='submit' title='Add' className='w-[100px] rounded-md' />
				</Form>
				<ul className='mt-8 space-y-5'>
					{data.length > 0 ? (
						data.map(todo => {
							return <Item key={todo._id} {...todo} />;
						})
					) : (
						<li className='flex justify-center'>
							<i>Create your first todo</i>
						</li>
					)}
				</ul>
			</Card>
		</>
	);
};

export default Index;
