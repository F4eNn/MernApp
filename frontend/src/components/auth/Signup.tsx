import { useState, FormEvent } from 'react';

import { Form } from './Form';
import { FormControl } from '../ui/FormControl';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { FormValues } from '../../types/types';
import { authenticate} from '../../utils/auth';
import { ErrorMsg } from '../ui/ErrorMsg';
import { useNavigate } from 'react-router-dom';

export type ErrorItem = { msg: string; path: string };

type FormErrorType = {
	[key in keyof FormValues]: ErrorItem;
};

export const Signup = () => {
	const [errors, setErrors] = useState<FormErrorType | null>(null);
	const navigate = useNavigate();

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const formValues = Object.fromEntries(formData) as FormValues;
		const res = await authenticate(formValues, 'signup');

		if (res && !res.ok) {
			const { error } = await res?.json();
			return setErrors(error);
		}
		const { token, email } = await res?.json();
		localStorage.setItem('token', token);
		localStorage.setItem('email', email);
		setErrors(null);
		return navigate('/');
	};

	return (
		<Form title='Signup' onSubmit={onSubmit}>
			<FormControl>
				<Label title='E-mail' htmlFor='email' />
				<Input error={errors?.email} id='email' name='email' type='text' placeholder='john@doe.com' />
				{errors && errors.email && <ErrorMsg className='top-0' errorMsg={errors.email.msg} />}
			</FormControl>
			<FormControl>
				<Label title='Password' htmlFor='password' />
				<Input error={errors?.password} type='password' name='password' id='password' />
				{errors && errors.password && <ErrorMsg className='top-0' errorMsg={errors.password.msg} />}
			</FormControl>
			<FormControl>
				<Label title='Confirm Password' htmlFor='confirm' />
				<Input error={errors?.confirmPassword} type='password' id='confirmy' name='confirmPassword' />
				{errors && errors.confirmPassword && <ErrorMsg className='top-0' errorMsg={errors.confirmPassword.msg} />}
			</FormControl>
		</Form>
	);
};
