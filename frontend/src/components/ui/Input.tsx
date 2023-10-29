import { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/utils';

type InpuProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...rest }: InpuProps) => {
	return (
		<input
			{...rest}
			className={cn(
				'form-input focus:border-primary  w-full rounded-md px-3 py-1 focus:outline-0 focus:ring-0',
				className,
			)}
		></input>
	);
};
