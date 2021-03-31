import { Route, Redirect, RouteProps } from 'react-router-dom';
import { ReactNode } from 'react';

import { useAuth } from './hooks';
import { PrivateLayout } from '../layouts/PrivateLayout';

type Props = RouteProps & {
    children: ReactNode;
};

export const PrivateRoute = ({ children, ...rest }: Props) => {
    const auth = useAuth();
    console.log('auth in PrivateRoute', auth);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth?.user ? (
                    <PrivateLayout>{children}</PrivateLayout>
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
