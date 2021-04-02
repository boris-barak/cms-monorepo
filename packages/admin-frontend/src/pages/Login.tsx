import * as React from 'react';
import { Credentials } from 'cms-common/types/auth';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
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
    const auth = useAuth();
    const history = useHistory<LocationState>();
    const location = useLocation<LocationState>();
    const [form] = Form.useForm();

    const onFinish = async ({ email, password }: Credentials) => {
        const loggedIn = email && password ? await auth?.logIn({ email, password }) : undefined;

        if (loggedIn) {
            const { from } = location.state || { from: { pathname: '/pages' } };
            history.replace(from);
        } else {
            message.error('There is no user with given email and password');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form {...layout} form={form} name="login" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>

                <Form.Item {...tailLayout} shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Log In
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </>
    );
};
