import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Login } from './pages/Login';
import { PagesOverview } from './pages/PagesOverview';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAuth } from './routes/hooks';
import { ProvideAuth } from './routes/ProvideAuth';
import { PrivateRoute } from './routes/PrivateRoute';
import 'antd/dist/antd.css';
import { PublicLayout } from './layouts/PublicLayout';

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

const Routing = () => {
    const auth = useAuth();
    const loggedIn = auth?.user;

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {loggedIn ? <Redirect to="/pages" /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/login">
                    <PublicLayout title="Login to CMS Administration">
                        <Login />
                    </PublicLayout>
                </Route>
                <PrivateRoute exact path="/pages">
                    <PagesOverview />
                </PrivateRoute>
            </Switch>
        </Router>
    );
};

export const App = () => (
    <QueryClientProvider client={queryClient}>
        <ProvideAuth>
            <Routing />
        </ProvideAuth>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
