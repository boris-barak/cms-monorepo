import * as React from 'react';
import { BrowserRouter as Router, Link, Switch, Route, useHistory } from 'react-router-dom';

import { Login } from './pages/Login';
import { PagesOverview } from './pages/PagesOverview';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAuth } from './routes/hooks';
import { ProvideAuth } from './routes/ProvideAuth';
import { PrivateRoute } from './routes/PrivateRoute';

const AuthButton = () => {
    const history = useHistory();
    const auth = useAuth();

    return auth?.user ? (
        <p>
            Welcome!{' '}
            <button
                onClick={() => {
                    auth?.signOut(() => history.push('/'));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
};

const queryClientOptions = {
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: 0,
            retry: 0,
            refetchOnWindowFocus: false,
        },
    },
};
const queryClient = new QueryClient(queryClientOptions);

export const App = () => {
    const auth = useAuth();

    return (
        <QueryClientProvider client={queryClient}>
            <ProvideAuth>
                <Router>
                    {auth?.user && (
                        <ul>
                            <li>
                                <Link to="/login">Login Page</Link>
                            </li>
                            <li>
                                <Link to="/pages">Pages Page</Link>
                            </li>
                        </ul>
                    )}

                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <PrivateRoute path="/pages">
                            <PagesOverview />
                        </PrivateRoute>
                    </Switch>
                </Router>
            </ProvideAuth>
        </QueryClientProvider>
    );
};
