import { PropsWithChildren } from '../../types/types';

export const FormControl = ({ children }: PropsWithChildren) => {
	return <div className='w-full'>{children}</div>;
};
