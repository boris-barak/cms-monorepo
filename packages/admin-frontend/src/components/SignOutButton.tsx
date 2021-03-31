import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { useAuth } from '../routes/hooks';
import { LogoutOutlined } from '@ant-design/icons';

export const SignOutButton = () => {
    const history = useHistory();
    const auth = useAuth();

    return (
        <Button
            type="primary"
            icon={<LogoutOutlined />}
            style={{ float: 'right', top: '15px' }}
            onClick={() => {
                auth?.signOut();
                history.push('/');
            }}
        >
            Sign out
        </Button>
    );
};
