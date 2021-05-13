import * as React from 'react';
import { Button, Collapse, Form, Input, Modal, Space } from 'antd';
import { KeywordsEditor } from './KeywordsEditor';
import { PageDetail } from 'cms-common/types/page';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { ContentEditor } from './ContentEditor';
import { reducer } from './ContentEditor/reducer';

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
    page: PageDetail;
    onClose: () => void;
};

export const PageDetailModal = ({ page, onClose }: Props) => {
    const [form] = Form.useForm();
    const [content, dispatch] = React.useReducer(reducer, page.content);

    console.log('page', page);

    const onFinish = (values: PageDetail) => {
        console.log('Success:', values);
        onClose();
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity<PageDetail>) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal title="Page editing" visible={true} footer={null} width="100%" onCancel={onClose}>
            <Form<PageDetail>
                {...layout}
                form={form}
                name="page"
                initialValues={page}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input page title!' }]}>
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
                        {content && (
                            <>
                                asdsad <ContentEditor content={content} dispatch={dispatch} />
                            </>
                        )}
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
        </Modal>
    );
};
