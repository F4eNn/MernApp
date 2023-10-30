import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { navPaths } from './constants/navigation';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Auth from './routes/auth';
import Index, { action as indexAction } from './routes/Index';

const router = createBrowserRouter([
	{
		path: navPaths.home.path,
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Index />, action: indexAction },
			{
				path: navPaths.auth.path,
				element: <Auth />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
