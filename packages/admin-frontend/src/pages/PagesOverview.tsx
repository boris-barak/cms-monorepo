import * as React from 'react';

import { getAllPages } from '../api/content-service';
import { useQuery } from 'react-query';
import { openInNewTab } from '../utils';
import { Button, Space, Table, Typography } from 'antd';
import { PageDetailModal } from '../components/PageDetailModal';

const { Title } = Typography;

export const PagesOverview = () => {
    const { data } = useQuery('pages', getAllPages);
    const [pageUrl, setPageUrl] = React.useState<string>();

    const handleOpen = (url: string) => openInNewTab(`http://localhost:3000/${url}`);
    const handleEdit = (url: string) => {
        setPageUrl(url);
    };

    const pages = data?.map((page) => ({ ...page, key: page.url }));

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
                    <Button onClick={() => handleEdit(url)}>Edit</Button>
                    <Button onClick={() => handleOpen(url)}>Go to</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            {pageUrl !== undefined && <PageDetailModal pageUrl={pageUrl} onClose={() => setPageUrl(undefined)} />}
            <Title>Pages Overview</Title>
            <Table columns={columns} dataSource={pages} />
        </>
    );
};
