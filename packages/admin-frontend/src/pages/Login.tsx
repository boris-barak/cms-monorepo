import * as React from 'react';
import { Credentials } from 'common/types/auth';
import { Heading } from '../design-components/Heading';
import { ButtonArea, Form, PasswordInput, TextInput } from '../design-components/Form';
import { Button } from '../design-components/Button';

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
        <>
            <Heading level={1}>Login to CMS Administration</Heading>
            <Form>
                <TextInput name="login" label="Login" onChange={(value) => setLogin(value.target.value)} />
                <PasswordInput name="password" label="Password" onChange={(value) => setPassword(value.target.value)} />
                <ButtonArea>
                    <Button onClick={() => handleSubmit()}>Login</Button>
                </ButtonArea>
            </Form>
        </>
    );
};
