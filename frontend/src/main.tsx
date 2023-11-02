import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { navPaths } from './constants/navigation';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Auth, { loader as authLoader } from './routes/auth';
import Index, { action as indexAction, loader as indexLoader } from './routes/Index';
import Edit, { action as editAction } from './routes/edit';

const router = createBrowserRouter([
	{
		path: navPaths.home.path,
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Index />, action: indexAction, loader: indexLoader },
			{ path: navPaths.edit.path, element: <Edit />, action: editAction },
			{
				path: navPaths.auth.path,
				element: <Auth />,
				loader: authLoader,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
