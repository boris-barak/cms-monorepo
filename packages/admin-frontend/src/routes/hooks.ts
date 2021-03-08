import * as React from 'react';

type Callback = () => void;

type ProvideAuth = {
    user: string | undefined;
    signIn: (cb: Callback) => void;
    signOut: (cb: Callback) => void;
};

const fakeAuth = {
    isAuthenticated: false,
    signIn(cb: Callback) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signOut(cb: Callback) {
        fakeAuth.isAuthenticated = false;
        cb();
    },
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
export const authContext = React.createContext<ProvideAuth | undefined>(undefined);

export const useAuth = () => React.useContext(authContext);

export const useProvideAuth = (): ProvideAuth => {
    const [user, setUser] = React.useState<string>();

    const signIn = (cb: Callback) =>
        fakeAuth.signIn(() => {
            console.log('signIn in useProvideAuth called');
            setUser('user');
            cb();
        });

    const signOut = (cb: Callback) =>
        fakeAuth.signOut(() => {
            setUser(undefined);
            cb();
        });

    return {
        user,
        signIn,
        signOut,
    };
};
