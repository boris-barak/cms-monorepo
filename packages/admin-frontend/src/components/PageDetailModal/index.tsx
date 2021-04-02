import * as React from 'react';
import { Button, Form, Input, Modal, Spin } from 'antd';
import { useQuery } from 'react-query';
import { getOnePageByUrl } from '../../api/content-service';
import { KeywordsEditor } from './KeywordsEditor';

const layout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
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
        onClose();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal title="Page editing" visible={pageUrl !== undefined} footer={null} onCancel={onClose}>
            {page ? (
                <Form<{ asd: string }>
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

                    <KeywordsEditor />

                    <Form.Item {...tailLayout}>
                        <Button key="back" htmlType="button" onClick={onClose}>
                            Cancel
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button key="submit" type="primary" htmlType="submit" loading={false}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <Spin size="large" />
            )}
        </Modal>
    );
};
