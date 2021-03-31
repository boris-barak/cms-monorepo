import * as React from 'react';
import { Credentials } from 'cms-common/types/auth';
import { Form, Input, Button } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../routes/hooks';

type LocationState = {
    from: {
        pathname: string;
    };
};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const Login = () => {
    // const [email, setEmail] = React.useState<string>();
    // const [password, setPassword] = React.useState<string>();
    const auth = useAuth();
    const history = useHistory<LocationState>();
    const location = useLocation<LocationState>();

    // const handleSubmit = async () => {
    //     const token = email && password ? await auth?.signIn({ email, password }) : undefined;
    //
    //     if (token) {
    //         const { from } = location.state || { from: { pathname: '/pages' } };
    //         history.replace(from);
    //     }
    // };

    const onFinish = async ({ email, password }: Credentials) => {
        const token = email && password ? await auth?.signIn({ email, password }) : undefined;

        if (token) {
            const { from } = location.state || { from: { pathname: '/pages' } };
            history.replace(from);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
