import { createRoot } from 'react-dom/client';
import { Outlet, Navigate, RouterProvider, createBrowserRouter } from 'react-router';

import App from './app';
import { routesSection } from './routes/sections';

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard/tickets" replace />,
      },
      ...routesSection,
    ],
  },
]);

const root = createRoot(document.getElementById('root')!);
root.render(<RouterProvider router={router} />);
