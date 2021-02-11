import * as React from 'react';
import '../App.css';
import { Credentials } from 'common/types/auth';

type Props = {
    onSubmit: (credentials: Credentials) => Promise<boolean>;
};

export const Login = ({ onSubmit }: Props) => {
    const [login, setLogin] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();

    const handleSubmit = async () => {
        const isAuthenticated = login && password ? await onSubmit({ login, password }) : false;

        console.log('isAuthenticated', isAuthenticated);
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Login to CMS Administration</p>
                <label htmlFor="login">Login</label>
                <input type="text" name="login" defaultValue="" onChange={(value) => setLogin(value.target.value)} />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    defaultValue=""
                    onChange={(value) => setPassword(value.target.value)}
                />
                <br />
                <button onClick={() => handleSubmit()}>Login</button>
            </header>
        </div>
    );
};
