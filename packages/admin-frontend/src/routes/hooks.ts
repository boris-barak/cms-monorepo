import * as React from 'react';
import { Credentials } from 'cms-common/types/auth';

import { login } from '../api/auth-service';

type ProvideAuth = {
    user: User | undefined;
    logIn: (credentials: Credentials) => Promise<boolean>;
    logOut: () => void;
};

type User = { access_token: string };

export const useProvideAuth = (): ProvideAuth => {
    const savedToken = localStorage.getItem('access_token');

    const [user, setUser] = React.useState<User | undefined>(savedToken ? { access_token: savedToken } : undefined);

    const logIn = async (credentials: Credentials) => {
        const token = await login(credentials);

        if (token) {
            setUser({ access_token: token });
            localStorage.setItem('access_token', token);
        }

        return !!token;
    };

    const logOut = () => {
        setUser(undefined);
    };

    return {
        user,
        logIn,
        logOut,
    };
};

export const authContext = React.createContext<ProvideAuth | undefined>(undefined);

export const useAuth = () => React.useContext(authContext);
