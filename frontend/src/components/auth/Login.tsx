import { Form } from './Form';
import { FormControl } from '../ui/FormControl';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

export const Login = () => {
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
}
