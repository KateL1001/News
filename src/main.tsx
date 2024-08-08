import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/reset.scss';
import './styles/index.scss';
import { store } from './store/store.ts';
import Layout from './components/Layout/Layout.tsx';

const News = lazy(() => import('./pages/News/News.tsx'));
const NewsDetail = lazy(() => import('./pages/NewsDetail/NewsDetail.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				path: '/',
				element: <Suspense fallback="loading..."><News/></Suspense>
			},
			{
				path: '/newsItem/:id',
				element: <Suspense fallback="loading..."><NewsDetail/></Suspense>
			}
		]
	},
	
	{
		path: '*',
		element: <>notFound</>
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
		
	</React.StrictMode>
);
