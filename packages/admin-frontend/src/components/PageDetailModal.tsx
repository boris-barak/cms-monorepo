import * as React from 'react';
import { Button, Form, Input, Modal, Spin } from 'antd';
import { useQuery } from 'react-query';
import { getOnePageByUrl } from '../api/content-service';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

type Props = {
    pageUrl?: string;
    onClose: () => void;
};

export const PageDetailModal = ({ pageUrl, onClose }: Props) => {
    const [form] = Form.useForm();
    console.log('pageUrl', pageUrl);

    const { data: page } = useQuery(['page', pageUrl], () =>
        pageUrl !== undefined ? getOnePageByUrl(pageUrl) : undefined,
    );

    console.log('page', page);

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="Page editing"
            visible={pageUrl !== undefined}
            onOk={onClose}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={false} onClick={onClose}>
                    Save
                </Button>,
            ]}
        >
            {page ? (
                <Form
                    {...layout}
                    form={form}
                    name="page"
                    initialValues={page}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input page title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="URL" name="url" rules={[{ required: true, message: 'Please input page URL!' }]}>
                        <Input addonBefore="http://localhost:3000/" />
                    </Form.Item>
                </Form>
            ) : (
                <Spin size="large" />
            )}
        </Modal>
    );
};
