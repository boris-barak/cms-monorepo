import * as React from 'react';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { PageDetail } from 'cms-common/types/page';

import { getAllPages } from '../api/content-service';
import { useQuery } from 'react-query';
import { openInNewTab } from '../utils';
import { Button, Space, Table, Typography } from 'antd';
import { PageDetailModal } from '../components/PageDetailModal';

const { Title } = Typography;

export const PagesOverview = () => {
    const { data } = useQuery('pages', getAllPages);
    const [pageIndex, setPageIndex] = React.useState<number>();

    const handleVisit = (url: string) => openInNewTab(`http://localhost:3000/${url}`);
    const handleEdit = (pageIndex: number) => {
        setPageIndex(pageIndex);
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
            render: (url: string, page: PageDetail, pageIndex: number) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(pageIndex)}>
                        Edit
                    </Button>
                    <Button icon={<EyeOutlined />} onClick={() => handleVisit(url)}>
                        Visit
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            {pageIndex !== undefined && data && (
                <PageDetailModal page={data[pageIndex]} onClose={() => setPageIndex(undefined)} />
            )}
            <Title>Pages Overview</Title>
            <Table columns={columns} dataSource={pages} />
        </>
    );
};
