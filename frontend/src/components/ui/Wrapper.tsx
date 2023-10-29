import { PropsWithChildren } from '../../types/types';

export const Wrapper = ({ children }: PropsWithChildren) => {
	return <div className='mx-auto w-full max-w-[1440px]'>{children}</div>;
};
