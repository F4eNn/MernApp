import { Form, FormProps } from 'react-router-dom';

import { PropsWithChildren } from '../../types/types';
import Button from '../ui/Button';

type AuthCardProps = PropsWithChildren &
	FormProps & {
		title: 'Login' | 'Signup';
	};

export const AuthCard = ({ title, children, ...rest }: AuthCardProps) => {
	return (
		<div className='mx-3 mt-20 flex  justify-center '>
			<Form {...rest} className='bg-gray flex w-full max-w-[400px] flex-col items-center gap-5 rounded-md p-7 pb-7'>
				<h1 className='text-secondaryDark mb-4 text-3xl font-[600]'>{title}</h1>
				{children}
				<div className='mt-2 w-full'>
					<Button title={title} />
				</div>
			</Form>
		</div>
	);
};
