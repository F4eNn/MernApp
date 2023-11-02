import { InputHTMLAttributes, forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { cn } from '../../utils/utils';
import { ErrorItem } from '../auth/Signup';

type InpuProps = InputHTMLAttributes<HTMLInputElement> & {
	error?: ErrorItem | undefined;
};

export const Input = forwardRef(({ className, error, ...rest }: InpuProps, ref: ForwardedRef<HTMLInputElement>) => {
	return (
		<input
			ref={ref}
			{...rest}
			className={cn(
				'form-input focus:border-primary  w-full rounded-md px-3 py-1 focus:outline-0 focus:ring-0',
				className,
				error && 'border-error',
			)}
		></input>
	);
});
