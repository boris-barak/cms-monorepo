import * as React from 'react';
import { Button, Collapse, Form, Input, Modal, Space, Spin } from 'antd';
import { useQuery } from 'react-query';
import { getOnePageByUrl } from '../../api/content-service';
import { KeywordsEditor } from './KeywordsEditor';
import { PageDetail } from 'cms-common/types/page';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { ContentEditor } from './ContentEditor';

const { Panel } = Collapse;

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
    wrapperCol: { offset: 10, span: 24 },
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

    const onFinish = (values: PageDetail) => {
        console.log('Success:', values);
        onClose();
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity<PageDetail>) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal title="Page editing" visible={pageUrl !== undefined} footer={null} width="100%" onCancel={onClose}>
            {page ? (
                <Form<PageDetail>
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

                    <Collapse defaultActiveKey={['meta']}>
                        <Panel header="Meta data" key="meta">
                            <KeywordsEditor />
                        </Panel>

                        <Panel header="Content" key="content">
                            <ContentEditor pageUrl={pageUrl} />
                        </Panel>
                    </Collapse>

                    <Form.Item {...tailLayout}>
                        <Space size={24} style={{ paddingTop: 50 }}>
                            <Button key="submit" type="primary" htmlType="submit" loading={false}>
                                Save
                            </Button>
                            <Button key="back" htmlType="button" onClick={onClose}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            ) : (
                <Spin size="large" />
            )}
        </Modal>
    );
};
