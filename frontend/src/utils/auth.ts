import { FormValues } from '../types/types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const authenticate = async (credentials: FormValues, endpoint: 'signup' | 'login') => {
	try {
		const body = endpoint === 'signup' ? { ...credentials } : { ...credentials, confirmPassword: undefined };
		const res = await fetch(`${BACKEND_URL}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		return res;
	} catch (error) {
		console.log(error);
	}
};
export const getUser = async () => {
    const token = localStorage.getItem('token');
	const res = await fetch(`${BACKEND_URL}/is-authenticated`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
	});
    return res
};
