import * as React from 'react';

import { getAllPages } from '../api/content-service';
import { useQuery } from 'react-query';
import { openInNewTab } from '../utils';
import { Button, Space, Table, Typography } from 'antd';

const { Title } = Typography;

export const PagesOverview = () => {
    const { data: pages } = useQuery('pages', getAllPages);

    const handleOpen = (url: string) => openInNewTab(`http://localhost:3000/${url}`);
    const handleEdit = (url: string) => openInNewTab(`http://localhost:3000/${url}`);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Keywords',
            dataIndex: 'keywords',
            key: 'keywords',
            render: (keywords?: string[]) => keywords?.join(', '),
        },
        {
            title: 'Actions',
            key: 'actions',
            dataIndex: 'url',
            render: (url: string) => (
                <Space size="middle">
                    <Button onClick={() => handleOpen(url)}>Open</Button>
                    <Button onClick={() => handleEdit(url)}>Edit</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Title>Pages Overview</Title>
            <Table columns={columns} dataSource={pages} />
        </>
    );
};
