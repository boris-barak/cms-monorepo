import * as React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Button, Collapse, Form, Input, message, Modal, Space } from 'antd';
import { MutationResponse } from 'cms-common/types/response';

import { KeywordsEditor } from './KeywordsEditor';
import { PageContent, PageDetail, PageOverview } from 'cms-common/types/page';
import { ContentEditor } from './ContentEditor';
import { reducer } from './ContentEditor/reducer';
import { createPage, updatePage } from '../../api/content-service';

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

const initialContent: PageContent = {
    sections: [],
};

type Props = {
    page?: PageDetail;
    onClose: () => void;
};

export const PageDetailModal = ({ page, onClose }: Props) => {
    const [form] = Form.useForm();
    const [content, dispatch] = React.useReducer(reducer, page?.content ?? initialContent);

    const queryClient = useQueryClient();

    const mutationOptions = {
        onSuccess: async (result: MutationResponse) => {
            if (result.success) {
                await queryClient.invalidateQueries('pages');
                onClose();
                message.success('Saved successfully.');
            } else {
                message.error(`Could not be saved: ${result.message}`);
            }
        },
        onError: () => {
            message.error('Could not be saved. An unexpected error happened.');
        },
    };

    const createMutation = useMutation(createPage, mutationOptions);
    const updateMutation = useMutation(updatePage, mutationOptions);

    const onFinish = (pageOverview: PageOverview) => {
        const pageDetail = { ...pageOverview, content };
        if (page) {
            updateMutation.mutate(pageDetail);
        } else {
            createMutation.mutate(pageDetail);
        }
    };

    const onFinishFailed = () => {
        message.error('Cannot be saved. Please fix invalid values.');
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
