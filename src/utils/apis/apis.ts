import axios from 'axios';
import { Restaurants, User } from '../../interface/main.interface';
import { message } from 'antd';
import { authSignals } from '../../signals/signals';

export const apiService = {
    fetchRestaurants: async (query: string = ''): Promise<Restaurants[]> => {
        try {
            const response = await axios.get(
                `http://localhost:4040/restaurants${query}`
            );
            return response.data;
        } catch (error) {
            message.error('Failed to fetch restaurants');
            return [];
        }
    },
    fetchRestaurantById: async (id: string): Promise<Restaurants | null> => {
        // pardon me for this logic I am no expert in json server thats why i opted this way to populate the menuItems Tho I am caching it in local storage.
        try {
            const response = await axios.get(
                `http://localhost:4040/restaurants/${id}`
            );
            const restaurant = response.data;

            // Fetch menu items based on the menu array
            const menuItemsPromises = restaurant.menu.map((menuId: number) =>
                axios.get(`http://localhost:4040/menuItems/${menuId}`)
            );

            const menuItemsResponses = await Promise.all(menuItemsPromises);
            const menuItems = menuItemsResponses.map((res) => res.data);

            // Combine restaurant data with menu items
            return { ...restaurant, menuItems };
        } catch (error) {
            message.error('Failed to fetch restaurant details!');
            return null;
        }
    },
    validateLogin: async (values: { email: string; password: string }) => {
        try {
            const { data } = await axios.get<User[]>(
                `http://localhost:4040/users`
            );

            if (data) {
                const user = data.filter(
                    (x) =>
                        x.email === values.email &&
                        x.password === values.password
                )[0];

                if (!user) {
                    message.error("User doesn't exist or invalid password!");
                    return;
                }

                authSignals.loggedInUser.value = user;
                authSignals.loginModal.value = false;

                message.success('Login successfull 🎉🎉');
            }
        } catch (error) {
            message.error('Something went wrong, cannot login!');
        }
    },
    registerUser: async (userDetails: User) => {
        try {
            const { data } = await axios.post(
                `http://localhost:4040/users`,
                userDetails
            );

            if (data) {
                message.success('Registered Sucessfully');
                authSignals.registerModal.value = false;
            }
        } catch (error) {
            message.error('Something went wrong, cannot register!');
        }
    },
};
