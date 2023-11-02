import { FormValues } from '../types/types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const signup = async (credentials: FormValues) => {
	try {
		const res = await fetch(`${BACKEND_URL}/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...credentials }),
		});
		return res
	} catch (err) {
		console.error(err);
	}
};
