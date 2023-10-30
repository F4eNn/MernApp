import { useLocation } from 'react-router-dom';
import { Form } from '../components/auth/Form';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { FormControl } from '../components/ui/FormControl';

const Auth = () => {
	const { search } = useLocation();
	const q = search.split('=')[1];

	if (q === 'signup') {
		return (
			<Form title='Signup'>
				<FormControl>
					<Label title='E-mail' htmlFor='email' />
					<Input id='email' type='text' placeholder='john@doe.com' />
				</FormControl>
				<FormControl>
					<Label title='Password' htmlFor='password' />
					<Input type='password' id='password' />
				</FormControl>
				<FormControl>
					<Label title='Confirm Password' htmlFor='confirm' />
					<Input type='password' id='confirmy' />
				</FormControl>
			</Form>
		);
	}

	return (
		<Form title='Login'>
			<FormControl>
				<Label title='E-mail' />
				<Input type='text' placeholder='john@doe.com' />
			</FormControl>
			<FormControl>
				<Label title='Password' />
				<Input type='password' />
			</FormControl>
		</Form>
	);
};

export default Auth;
