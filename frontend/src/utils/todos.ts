const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createTodos = async ({ todo }: { [k: string]: FormDataEntryValue }) => {
	try {
		const res = await fetch(`${BACKEND_URL}/todo`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ todo }),
		});
		if (!res.ok || res.status !== 201) {
			const error = await res.json();
			return error;
		}
		return res;
	} catch (err) {
		console.error(err);
	}
};
export const getTodos = async () => {
	try {
		const res = await fetch(`${BACKEND_URL}/todo`);
		const data = res.json();
		return data;
	} catch (err) {
		console.error(err);
	}
};
