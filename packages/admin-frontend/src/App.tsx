import * as React from 'react';
import './App.css';
import { Login } from './pages/Login';
import { PagesOverview } from './pages/PagesOverview';
import { login } from './api/auth-service';
import { QueryClient, QueryClientProvider } from 'react-query';

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

export const App = () => (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <Login onSubmit={login} />

            <PagesOverview />
        </QueryClientProvider>
    </div>
);
