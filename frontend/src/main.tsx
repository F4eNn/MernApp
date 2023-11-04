import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import { navPaths } from './constants/navigation';
import Root, { loader as rootLoader, shouldRevalidate as shouldRevalidateRoot } from './routes/root';
import ErrorPage from './routes/error-page';
import Auth, { loader as authLoader } from './routes/auth';
import Index, { action as indexAction, loader as indexLoader } from './routes/Index';
import Edit, { action as editAction, loader as loaderEdit } from './routes/edit';

const router = createHashRouter([
	{
		path: navPaths.home.path,
		element: <Root />,
		loader: rootLoader,
		shouldRevalidate: shouldRevalidateRoot,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Index />, action: indexAction, loader: indexLoader },
			{ path: navPaths.edit.path, element: <Edit />, action: editAction, loader: loaderEdit },
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
