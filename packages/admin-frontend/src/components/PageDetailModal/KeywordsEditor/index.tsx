import * as React from 'react';
import { Button, Form, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './styles.css';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

export const KeywordsEditor = () => (
    <Form.List
        name="keywords"
        rules={[
            {
                validator: async (_, keywords) => {
                    if (!keywords || keywords.length < 1) {
                        return Promise.reject(new Error('At least 1 keyword'));
                    }
                },
            },
        ]}
    >
        {(fields, { add, remove }, { errors }) => (
            <>
                {fields.map((field, index) => (
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? 'Keywords' : ''}
                        required={false}
                        key={field.key}
                    >
                        <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input a keyword or delete this field.',
                                },
                            ]}
                            noStyle
                        >
                            <Input placeholder="a keyword" style={{ width: '60%' }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                            <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                        ) : null}
                    </Form.Item>
                ))}
                <Form.Item>
                    <Button type="dashed" onClick={() => add()} style={{ width: '60%' }} icon={<PlusOutlined />}>
                        Add field
                    </Button>
                    <Button
                        type="dashed"
                        onClick={() => {
                            add('The head item', 0);
                        }}
                        style={{ width: '60%', marginTop: '20px' }}
                        icon={<PlusOutlined />}
                    >
                        Add field at head
                    </Button>
                    <Form.ErrorList errors={errors} />
                </Form.Item>
            </>
        )}
    </Form.List>
);
