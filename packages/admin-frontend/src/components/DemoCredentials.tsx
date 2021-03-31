import * as React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

export const DemoCredentials = () => (
    <>
        <Title level={4}>Demo credentials</Title>
        <Row gutter={[8, 8]}>
            <Col span={4}>
                <Text>E:</Text>
            </Col>
            <Col span={20}>
                <Text>admin@example.com</Text>
            </Col>

            <Col span={4}>
                <Text>P:</Text>
            </Col>
            <Col span={20}>
                <Text>admin</Text>
            </Col>
        </Row>
    </>
);
