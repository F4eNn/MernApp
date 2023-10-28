import { HtmlHTMLAttributes } from 'react';
import { PropsWithChildren } from '../../types/types';
import { Wrapper } from './Wrapper';
import { cn } from '../../utils/utils';

type CardProps = PropsWithChildren & HtmlHTMLAttributes<HTMLDivElement>;

export const Card = ({ className, children, ...rest }: CardProps) => {
	return (
		<section className='mx-3'>
			<Wrapper>
				<div {...rest} className={cn(' bg-gray mx-auto mt-20 w-full max-w-[700px] rounded-md p-5 ', className)}>
					{children}
				</div>
			</Wrapper>
		</section>
	);
};
