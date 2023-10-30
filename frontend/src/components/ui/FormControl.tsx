import { PropsWithChildren } from '../../types/types';

export const FormControl = ({ children }: PropsWithChildren) => {
	return <div className='relative w-full'>{children}</div>;
};
