import { useLocation } from 'react-router-dom';

import { Signup } from '../components/auth/Signup';
import { Login } from '../components/auth/Login';

const Auth = () => {
	const { search } = useLocation();
	const q = search.split('=')[1];

	return <>{q === 'signup' ? <Signup /> : <Login />}</>;
};

export default Auth;
