import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	title: string;
};

const Button = ({ title, className, ...rest }: ButtonProps) => {
	return (
		<button
			{...rest}
			className={cn(
				'bg-primary text-gray focus:outline-secondary hover:bg-primary/80 colors-300 w-full rounded-sm py-2 font-[500] ',
				className,
			)}
		>
			{title}
		</button>
	);
};

export default Button;
