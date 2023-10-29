import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<div className='flex h-screen flex-col items-center justify-center gap-3'>
				<h1 className='text-5xl font-[400]'>Oops!</h1>
				<p className='text-xl'>Sorry, an unexpected error has occurred.</p>
				<p className='text-lg'>
					<i>
						{error.statusText}  {error.status}
					</i>
				</p>
			</div>
		);
	}
};

export default ErrorPage;
