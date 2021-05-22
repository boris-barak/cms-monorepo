import * as React from 'react';
import { EditOutlined, EyeOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { PageDetail } from 'cms-common/types/page';
import { MutationResponse } from 'cms-common/types/response';

import { getAllPages, removePageByUrl } from '../api/content-service';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { openInNewTab } from '../utils';
import { Button, message, Space, Table, Typography } from 'antd';
import { PageDetailModal } from '../components/PageDetailModal';

const { Title } = Typography;

type ModalSettings = {
    showModal: boolean;
    pageIndex?: number;
};

export const PagesOverview = () => {
    const queryClient = useQueryClient();

    const { data } = useQuery('pages', getAllPages);

    const removeMutation = useMutation(removePageByUrl, {
        onSuccess: async (result: MutationResponse) => {
            if (result.success) {
                await queryClient.invalidateQueries('pages');
                message.success('Removed successfully.');
            } else {
                message.error(`Could not be removed: ${result.message}`);
            }
        },
        onError: () => {
            message.error('Could not be removed. An unexpected error happened.');
        },
    });

    const [modalSettings, setModalSettings] = React.useState<ModalSettings>({
        showModal: false,
    });

    const handleVisitPage = (url: string) => openInNewTab(`http://localhost:3000/${url}`);
    const handleEditPage = (pageIndex: number) => {
        setModalSettings({ showModal: true, pageIndex });
    };
    const handleRemovePage = (url: string) => {
        removeMutation.mutate(url);
    };
    const handleCreatePage = () => {
        setModalSettings({ showModal: true });
    };
    const handleCloseModal = () => {
        setModalSettings({ showModal: false });
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
                    <Button icon={<EditOutlined />} onClick={() => handleEditPage(pageIndex)}>
                        Edit
                    </Button>
                    <Button icon={<EyeOutlined />} onClick={() => handleVisitPage(url)}>
                        Visit
                    </Button>
                    <Button icon={<MinusOutlined />} onClick={() => handleRemovePage(url)}>
                        Remove
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            {modalSettings.showModal && data && (
                <PageDetailModal
                    page={modalSettings.pageIndex ? data[modalSettings.pageIndex] : undefined}
                    onClose={() => handleCloseModal()}
                />
            )}
            <Title>Pages Overview</Title>
            <Table columns={columns} dataSource={pages} />
            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: 'left', top: '-48px', left: '15px' }}
                onClick={() => handleCreatePage()}
            >
                Create a new page
            </Button>
        </>
    );
};
