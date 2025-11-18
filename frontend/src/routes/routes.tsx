import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './layouts';
import { HomePage, NotFoundPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // Feature routes will be added here
      // e.g., { path: 'cars', element: <CarListPage /> }
      // e.g., { path: 'cars/:id', element: <CarDetailPage /> }
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
