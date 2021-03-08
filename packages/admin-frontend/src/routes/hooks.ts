import * as React from 'react';
import { Credentials } from 'common/types/auth';

import { login } from '../api/auth-service';

type ProvideAuth = {
    user: string | undefined;
    signIn: (credentials: Credentials) => Promise<boolean>;
    signOut: () => void;
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
export const authContext = React.createContext<ProvideAuth | undefined>(undefined);

export const useAuth = () => React.useContext(authContext);

export const useProvideAuth = (): ProvideAuth => {
    const [user, setUser] = React.useState<string>();

    const signIn = async (credentials: Credentials) => {
        const isAuthenticated = await login(credentials);

        console.log('signIn in useProvideAuth called');
        if (isAuthenticated) {
            setUser('user');
        }

        return isAuthenticated;
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
