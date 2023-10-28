import { useLocation } from 'react-router-dom';
import { AuthCard } from '../components/auth/Card';
import { Input } from '../components/auth/Input';
import { Label } from '../components/auth/Label';
import { FormControl } from '../components/auth/FormControl';

const Auth = () => {
	const { search } = useLocation();
	const q = search.split('=')[1];

	if (q === 'signup') {
		return (
			<AuthCard title='Signup'>
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
			</AuthCard>
		);
	}

	return (
		<AuthCard title='Login'>
			<FormControl>
				<Label title='E-mail' />
				<Input type='text' placeholder='john@doe.com' />
			</FormControl>
			<FormControl>
				<Label title='Password' />
				<Input type='password' />
			</FormControl>
		</AuthCard>
	);
};

export default Auth;
