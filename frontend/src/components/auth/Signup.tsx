import { Form } from './Form';
import { FormControl } from '../ui/FormControl';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

export const Signup = () => {
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
};
