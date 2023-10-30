export const ErrorMsg = ({ errorMsg }: { errorMsg: string }) => {
	return <span className='text-error absolute -top-5 right-1 text-xs'>{errorMsg}</span>;
};
