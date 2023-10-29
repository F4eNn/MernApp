import { LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
	title: 'E-mail' | 'Password' | 'Confirm Password';
};

export const Label = ({ title, ...rest }: LabelProps) => {
	return (
		<label className='block ' {...rest}>
			{title}
		</label>
	);
};
