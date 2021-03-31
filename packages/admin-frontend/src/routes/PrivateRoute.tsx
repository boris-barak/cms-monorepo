import { Route, Redirect, RouteProps } from 'react-router-dom';
import { ReactNode } from 'react';

import { useAuth } from './hooks';

type Props = RouteProps & {
    children: ReactNode;
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const PrivateRoute = ({ children, ...rest }: Props) => {
    const auth = useAuth();
    console.log('auth in PrivateRoute', auth);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth?.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
