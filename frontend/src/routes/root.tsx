import { Outlet, NavLink, Link } from 'react-router-dom';
import { Wrapper } from '../components/ui/Wrapper';
import { navPaths } from '../constants/navigation';

const navArray = [
	['Login', `${navPaths.auth.path}?mode=login`],
	['Signup', `${navPaths.auth.path}?mode=signup`],
];
const Root = () => {
	return (
		<div id='sidebar'>
			<nav className='bg-primary text-secondaryDark p-3.5'>
				<Wrapper>
					<div className='flex items-center justify-between'>
						<h1 className='text-2xl  font-bold'>
							<Link to={navPaths.home.path}>Todo</Link>
						</h1>
						<ul className='flex gap-5'>
							{navArray.map(([name, path], idx) => {
								return (
									<li key={idx}>
										<NavLink className='colors-300 hover:text-gray p-3 ' to={path}>
											{name}
										</NavLink>
									</li>
								);
							})}
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
