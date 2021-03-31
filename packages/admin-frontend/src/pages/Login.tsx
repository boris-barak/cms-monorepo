import * as React from 'react';

import { Heading } from '../design-components/Heading';
import { ButtonArea, Form, PasswordInput, TextInput } from '../design-components/Form';
import { Button } from '../design-components/Button';
import { useAuth } from '../routes/hooks';
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
        const token = email && password ? await auth?.signIn({ email, password }) : undefined;

        if (token) {
            const { from } = location.state || { from: { pathname: '/pages' } };
            history.replace(from);
        }
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
