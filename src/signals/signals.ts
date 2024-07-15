import { effect, signal } from '@preact/signals-react';
import { User } from '../interface/main.interface';
import { constants } from '../utils/constants';

export const authSignals = {
    loginModal: signal<boolean>(false),
    registerModal: signal<boolean>(false),
    loggedInUser: signal<User | null>(
        JSON.parse(localStorage.getItem(constants.USER) as string)
    ),
};

export const searchSignals = {
    restaurantId: signal<string>(),
};

effect(() => {
    if (authSignals.loggedInUser.value) {
        localStorage.setItem(
            constants.USER,
            JSON.stringify(authSignals.loggedInUser.value)
        );
    }
});
