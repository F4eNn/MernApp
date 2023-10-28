
import { Outlet } from 'react-router-dom';
const Root = () => {
	return (
		<div id='sidebar'>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Root;
