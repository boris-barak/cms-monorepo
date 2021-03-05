import { Route, Redirect, RouteProps } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from './hooks';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
type Props = RouteProps & {
    children: ReactNode;
};

export const PrivateRoute = ({ children, ...rest }: Props) => {
    const auth = useAuth();

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
