import { redirect, useLocation } from 'react-router-dom';

import { Signup } from '../components/auth/Signup';
import { Login } from '../components/auth/Login';
import { getUser } from '../utils/auth';

export const loader = async () => {
	const res = await getUser()
	const data = await res.json();
	if (data.loggedIn === true) {
		return redirect('/');
	}
	return null
};

const Auth = () => {
	const { search } = useLocation();
	const q = search.split('=')[1];

	return <>{q === 'signup' ? <Signup /> : <Login />}</>;
};

export default Auth;
