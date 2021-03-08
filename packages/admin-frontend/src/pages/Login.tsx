import * as React from 'react';

import { login } from '../api/auth-service';
import { Heading } from '../design-components/Heading';
import { ButtonArea, Form, PasswordInput, TextInput } from '../design-components/Form';
import { Button } from '../design-components/Button';
import { useAuth, useProvideAuth } from '../routes/hooks';
import { useHistory, useLocation } from 'react-router-dom';

type LocationState = {
    from: {
        pathname: string;
    };
};

export const Login = () => {
    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const auth = useAuth();
    const history = useHistory<LocationState>();
    const location = useLocation<LocationState>();

    const handleSubmit = async () => {
        const isAuthenticated = email && password ? await login({ email, password }) : false;
        if (isAuthenticated) {
            auth?.signIn(() => {
                console.log('signIn callback in Login called');
                const { from } = location.state || { from: { pathname: '/pages' } };
                console.log('from', from);

                history.replace(from);
            });
        }

        console.log('isAuthenticated', isAuthenticated);
    };

    return (
        <>
            <Heading level={1}>Login to CMS Administration</Heading>
            <Form>
                <TextInput name="email" label="Email" onChange={(value) => setEmail(value.target.value)} />
                <PasswordInput name="password" label="Password" onChange={(value) => setPassword(value.target.value)} />
                <ButtonArea>
                    <Button onClick={() => handleSubmit()}>Login</Button>
                </ButtonArea>
            </Form>
        </>
    );
};
