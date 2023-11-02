const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const putTodo = async ({
	todo,
	todoID,
	isDone,
}: {
	todo?: FormDataEntryValue;
	todoID?: FormDataEntryValue;
	isDone?: FormDataEntryValue;
}) => {
	try {
		const token = localStorage.getItem('token');
		const res = await fetch(`${BACKEND_URL}/todo`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify({ todo, todoID, isDone: isDone ? false : true }),
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
	const token = localStorage.getItem('token');
	try {
		const res = await fetch(`${BACKEND_URL}/todo`, { headers: { Authorization: `Bearer ${token}` } });
		const data = await res.json();
		return data;
	} catch (err) {
		console.error(err);
	}
};
export const deleteTodo = async (todoID: FormDataEntryValue) => {
	const token = localStorage.getItem('token');
	try {
		const res = await fetch(`${BACKEND_URL}/todo`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify({ todoID }),
		});
		return res;
	} catch (error) {
		console.error(error);
	}
};
