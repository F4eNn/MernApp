import { Card } from '../components/ui/Card';
import { Form, redirect, useActionData } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Item } from '../components/tasks/Item';

import { createTodos } from '../utils/todos';
import { Label } from '../components/ui/Label';
import { FormControl } from '../components/ui/FormControl';
import { ErrorMsg } from '../components/ui/ErrorMsg';

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

const Index = () => {
	const error = useActionData() as string;
	return (
		<>
			<Card id='progress'>
				<h1 className='text-2xl font-[500]'>Your Tasks</h1>
			</Card>
			<Card id='tasks' className='mt-10 py-8'>
				<Form method='POST' className='flex gap-5'>
					<FormControl>
						<Label title='' htmlFor='createTodo' />
						<Input className='py-3' id='createTodo' placeholder='Add your todo' name='todo' />
						<ErrorMsg errorMsg={error} />
					</FormControl>
					<Button type='submit' title='Add' className='w-[100px] rounded-md' />
				</Form>
				<Form className='mt-8'>
					<ul className='space-y-5'>
						<Item />
						<Item />
						<Item />
						<Item />
					</ul>
				</Form>
			</Card>
		</>
	);
};

export default Index;
