import { InputHTMLAttributes } from 'react';

type InpuProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ ...rest }: InpuProps) => {
	return (
		<input
			{...rest}
			className='form-input focus:border-primary  w-full rounded-md px-3 py-1 focus:outline-0 focus:ring-0 '
		></input>
	);
};
