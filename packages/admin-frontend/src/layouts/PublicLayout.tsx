import * as React from 'react';
import { Layout, Typography } from 'antd';
import { CommonFooter } from './CommonFooter';
import { DemoCredentials } from '../components/DemoCredentials';

const { Content, Header, Sider } = Layout;
const { Title } = Typography;

type Props = {
    title: string;
    children: React.ReactNode;
};

export const PublicLayout = ({ title, children }: Props) => (
    <Layout className="layout">
        <Header color="layout" style={{ backgroundColor: 'transparent' }}>
            <Title style={{ textAlign: 'center' }}>{title}</Title>
        </Header>
        <Layout style={{ padding: '24px' }}>
            <Sider style={{ backgroundColor: 'transparent' }}>
                <DemoCredentials />
            </Sider>
            <Content className="site-layout-background">{children}</Content>
            <Sider style={{ backgroundColor: 'transparent' }} />
        </Layout>
        <CommonFooter />
    </Layout>
);
