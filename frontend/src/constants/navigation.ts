type navigationItem = {
	path: string;
	label: string;
};

export const navPaths = {
	home: {
		path: '/',
		label: 'go to home page',
	},
	auth: {
		path: '/auth',
		label: 'log in or sign up',
	},
	edit: {
		path: '/edit/:todoID',
		label: 'edit todo',
	},
} as const satisfies Record<PropertyKey, navigationItem>;
