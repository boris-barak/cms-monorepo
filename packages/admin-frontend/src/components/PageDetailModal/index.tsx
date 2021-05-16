import * as React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Button, Collapse, Form, Input, message, Modal, Space } from 'antd';

import { KeywordsEditor } from './KeywordsEditor';
import { PageDetail, PageOverview } from 'cms-common/types/page';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { ContentEditor } from './ContentEditor';
import { reducer } from './ContentEditor/reducer';
import { updatePage } from '../../api/content-service';

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

    const queryClient = useQueryClient();

    const mutation = useMutation(updatePage, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('pages');
            onClose();
            message.success('Saved successfully');
        },
        onError: () => {
            message.error('Could not be saved');
        },
    });

    const onFinish = (pageOverview: PageOverview) => {
        const pageDetail = { ...pageOverview, content };
        mutation.mutate(pageDetail);
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity<PageDetail>) => {
        message.error(errorInfo);
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
