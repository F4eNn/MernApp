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
type ActionResType = {
	error: string;
	oldValue: string;
	todoID: string;
};

export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const resObj: Partial<ActionResType> = {};
	const todoForm = document.getElementById('todoForm') as HTMLFormElement;

	if (data.intent === 'create-todo') {
		const result: ResultType = await createTodos(data.todo);
		if (!result.ok) {
			resObj.error = result.errorMsg;
			return resObj;
		}
	}
	if (data.intent === 'edit-todo') {
		resObj.oldValue = data.oldValue as string;
		todoForm.reset();
		return resObj;
	}
	todoForm.reset();
	return redirect('/');
}

export async function loader() {
	const todos = await getTodos();
	return todos;
}

const Index = () => {
	const action = useActionData() as ActionResType;
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
						<Input
							className='py-3'
							id='createTodo'
							placeholder='Add your todo'
							name='todo'
							defaultValue={action && action.oldValue}
						/>
						{action && <ErrorMsg errorMsg={action.error} />}
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
