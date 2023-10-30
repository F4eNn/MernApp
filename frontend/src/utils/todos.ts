export const createTodos = async ({ todo }: { [k: string]: FormDataEntryValue }) => {
	try {
		const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/todo`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ todo }),
		});
		if (!res.ok || res.status !== 201) {
			const error = await res.json();
			return error;
		}
		return res
	} catch (err) {
		console.log(err);
	}
};
