import * as React from 'react';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Error from 'next/error';

import { Typography, Divider } from 'antd';
import styles from '../styles/Home.module.css';
import { PageDetail } from 'cms-common/types/page';

const { Title, Paragraph } = Typography;

const UnknownContentItem = ({ contentItem }: { contentItem: never }) => {
    console.log('Unknown Content Item', contentItem);
    return <div>Unknown Content Item</div>;
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const url = context.params?.url ?? '';

    const res = await fetch(`http://localhost:3001/pages/detail/${url}`);
    const data = await res.json();

    const errorCode = res.ok ? null : res.status;

    return {
        props: {
            data,
            errorCode,
        },
    };
};

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

type Props = { data?: PageDetail; errorCode: number | null };

const Page: React.FunctionComponent<Props> = ({ errorCode, data }: Props) => {
    if (errorCode) {
        return <Error statusCode={errorCode} />;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{data?.title} | Website</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="keywords" content={data?.keywords?.join(', ')} />
            </Head>

            <main className={styles.main}>
                {data && (
                    <p className={styles.description}>
                        {data.content.sections.map((section) => (
                            <React.Fragment key={section.hash}>
                                <Title>{section.header}</Title>
                                {section.items.map((item) => {
                                    switch (item.type) {
                                        case 'divider':
                                            return <Divider />;
                                        case 'paragraph':
                                            return <Paragraph>{item.content}</Paragraph>;
                                        default:
                                            return <UnknownContentItem contentItem={item} />;
                                    }
                                })}
                            </React.Fragment>
                        ))}
                    </p>
                )}
            </main>
            <footer className={styles.footer}>This is a common footer</footer>
        </div>
    );
};
export default Page;
