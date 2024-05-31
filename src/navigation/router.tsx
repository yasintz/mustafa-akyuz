import AppLayout from '@/containers/AppLayout';
import AkyuzHukuk from '@/app/akyuz-hukuk/src/pages';
import { Outlet, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/mustafa-akyuz',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        index: true,
        element: <AkyuzHukuk />,
      },
    ],
  },
]);

export default router;
