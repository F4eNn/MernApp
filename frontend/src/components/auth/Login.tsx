import type { FormEvent } from 'react';
import { useState } from 'react';
import { Form } from './Form';
import { FormControl } from '../ui/FormControl';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { ErrorMsg } from '../ui/ErrorMsg';
import { authenticate } from '../../utils/auth';
import { FormValues } from '../../types/types';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const credentials = Object.fromEntries(formData) as FormValues;
		const res = await authenticate(credentials, 'login');
		if (res && !res.ok) {
			const { message } = await res.json();
			return setError(message);
		}
		const { token, email } = await res?.json();
		localStorage.setItem('token', token);
		localStorage.setItem('email', email);
		return navigate('/');
	};

	return (
		<Form title='Login' onSubmit={onSubmit}>
			<ErrorMsg className='relative top-0' errorMsg={error} />
			<FormControl>
				<Label title='E-mail' />
				<Input name='email' type='text' placeholder='john@doe.com' />
			</FormControl>
			<FormControl>
				<Label title='Password' />
				<Input type='password' name='password' />
			</FormControl>
		</Form>
	);
};
