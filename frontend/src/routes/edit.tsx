import { Form, Params, redirect, useActionData, useLocation, useNavigate } from 'react-router-dom';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FormControl } from '../components/ui/FormControl';
import { ErrorMsg } from '../components/ui/ErrorMsg';
import { ResultType } from '../types/types';
import { putTodo } from '../utils/todos';

export const action = async ({ request, params }: { request: Request; params: Params }) => {
	const formData = await request.formData();
	const { todo } = Object.fromEntries(formData);
	const result: ResultType = await putTodo({ todo, todoID: params.todoID });
	let error: string;
	if (!result.ok) {
		error = result.errorMsg;
		return error;
	}
	return redirect('/');
};

const Edit = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const error = useActionData() as string;
	return (
		<Card>
			<h1 className='mb-7 text-center text-xl font-[600]'>Edit your todo 🧐</h1>
			<Form method='PUT' className='space-y-7'>
				<FormControl>
					<Label title='' htmlFor='createTodo' />
					<Input
						defaultValue={state && state.todo}
						className='py-3'
						id='createTodo'
						placeholder='Add your todo'
						name='todo'
					/>
					{error && <ErrorMsg errorMsg={error} />}
				</FormControl>
				<div className='flex justify-between'>
					<Button
						type='button'
						className='text-secondary w-[100px] bg-slate-300 hover:bg-slate-300/60'
						onClick={() => {
							navigate(-1);
						}}
						title='Cancel'
					/>
					<Button type='submit' className='w-[100px]' title='Update' />
				</div>
			</Form>
		</Card>
	);
};

export default Edit;
