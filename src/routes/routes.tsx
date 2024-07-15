import { createBrowserRouter } from 'react-router-dom';
import { HomePage, RestaurantDetails, Restaurants, RootPage } from '..';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '/restaurants',
                element: <Restaurants />,
            },
            {
                path: '/restaurants/:id',
                element: <RestaurantDetails />,
            },
        ],
    },
]);

export default router;
