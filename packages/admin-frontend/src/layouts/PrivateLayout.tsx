import * as React from 'react';
import { Layout, Menu } from 'antd';
import { CommonFooter } from './CommonFooter';
import { Link } from 'react-router-dom';
import { SignOutButton } from '../components/SignOutButton';

const { Header, Content } = Layout;

type Props = {
    children: React.ReactNode;
};

export const PrivateLayout = ({ children }: Props) => (
    <Layout>
        <Header>
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="login">
                    <Link to="/login">Login Page</Link>
                </Menu.Item>
                <Menu.Item key="pages">
                    <Link to="/pages">Pages Page</Link>
                </Menu.Item>

                <SignOutButton />
            </Menu>
        </Header>
        <Layout>
            <Content>{children}</Content>
        </Layout>
        <CommonFooter />
    </Layout>
);
