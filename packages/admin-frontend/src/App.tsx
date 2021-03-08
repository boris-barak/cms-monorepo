import * as React from 'react';
import { BrowserRouter as Router, Link, Switch, Route, useHistory, Redirect } from 'react-router-dom';

import { Login } from './pages/Login';
import { PagesOverview } from './pages/PagesOverview';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAuth } from './routes/hooks';
import { ProvideAuth } from './routes/ProvideAuth';
import { PrivateRoute } from './routes/PrivateRoute';

const AuthButton = () => {
    const history = useHistory();
    const auth = useAuth();

    return (
        <p>
            Welcome!{' '}
            <button
                onClick={() => {
                    auth?.signOut();
                    history.push('/');
                }}
            >
                Sign out
            </button>
        </p>
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
    const loggedIn = auth?.user;
    console.log('auth in App', auth);

    return (
        <QueryClientProvider client={queryClient}>
            <ProvideAuth>
                <Router>
                    {loggedIn && (
                        <>
                            <AuthButton />
                            <ul>
                                <li>
                                    <Link to="/login">Login Page</Link>
                                </li>
                                <li>
                                    <Link to="/pages">Pages Page</Link>
                                </li>
                            </ul>
                        </>
                    )}

                    <Switch>
                        <Route exact path="/">
                            {loggedIn ? <Redirect to="/pages" /> : <Redirect to="/login" />}
                        </Route>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <PrivateRoute exact path="/pages">
                            <PagesOverview />
                        </PrivateRoute>
                    </Switch>
                </Router>
            </ProvideAuth>
        </QueryClientProvider>
    );
};
