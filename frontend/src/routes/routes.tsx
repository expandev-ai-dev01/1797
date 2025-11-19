import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './layouts';
import { HomePage, NotFoundPage, CarCatalogPage, CarDetailPage } from '@/pages';

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
      {
        path: 'cars',
        element: <CarCatalogPage />,
      },
      { path: 'cars/:id', element: <CarDetailPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
