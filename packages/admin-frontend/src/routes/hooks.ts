import * as React from 'react';
import { Credentials } from 'common/types/auth';

import { login } from '../api/auth-service';

type ProvideAuth = {
    user: User | undefined;
    signIn: (credentials: Credentials) => Promise<string | undefined>;
    signOut: () => void;
};

type User = { access_token: string };

export const useProvideAuth = (): ProvideAuth => {
    const savedToken = localStorage.getItem('access_token');

    const [user, setUser] = React.useState<User | undefined>(savedToken ? { access_token: savedToken } : undefined);

    const signIn = async (credentials: Credentials) => {
        const token = await login(credentials);

        if (token) {
            setUser({ access_token: token });
            localStorage.setItem('access_token', token);
        }

        return token;
    };

    const signOut = () => {
        setUser(undefined);
    };

    return {
        user,
        signIn,
        signOut,
    };
};

export const authContext = React.createContext<ProvideAuth | undefined>(undefined);

export const useAuth = () => React.useContext(authContext);
