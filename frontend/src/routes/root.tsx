import { Outlet, NavLink, Link, useLoaderData } from 'react-router-dom';
import { Wrapper } from '../components/ui/Wrapper';
import { navPaths } from '../constants/navigation';
import { getUser } from '../utils/auth';

const navArray = [
	['Login', `${navPaths.auth.path}?mode=login`],
	['Signup', `${navPaths.auth.path}?mode=signup`],
];

export const loader = async () => {
	const res = await getUser();
	const user = await res.json();
	const email = localStorage.getItem('email');
	return { user, email };
};
const Root = () => {
	const { user, email } = useLoaderData() as any;

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('email');
	};

	return (
		<div id='sidebar'>
			<nav className='bg-primary text-secondaryDark p-3.5'>
				<Wrapper>
					<div className='flex items-center justify-between'>
						<h1 className='text-2xl  font-bold'>
							<Link to={navPaths.home.path}>Todo</Link>
						</h1>
						<ul className='flex items-center gap-5'>
							{user.loggedIn ? (
								<>
									<li>
										<span className='text-white'>
											{' '}
											Hello👋 <i>{email}</i>
										</span>
									</li>
									<li>
										<Link
											to='/auth'
											className='bg-secondary hover:bg-secondary/80 colors-300  rounded-md px-3 py-1.5 font-[500] text-white'
											onClick={logout}
											reloadDocument
										>
											Logout
										</Link>
									</li>
								</>
							) : (
								navArray.map(([name, path], idx) => {
									return (
										<li key={idx}>
											<NavLink className='colors-300 hover:text-gray p-3 ' to={path}>
												{name}
											</NavLink>
										</li>
									);
								})
							)}
						</ul>
					</div>
				</Wrapper>
			</nav>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Root;
