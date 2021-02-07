import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { GetStaticPropsContext } from 'next';
import Error, { ErrorProps } from 'next/error';

export type PageOverview = {
    title: string;
    url: string;
};

export type PageDetail = PageOverview & {
    keywords?: ReadonlyArray<string>;
    content: string;
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
                <title>Create Next App {data?.title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="keywords" content={data?.keywords?.join(', ')} />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>{data?.title}</h1>

                {data && <p className={styles.description} dangerouslySetInnerHTML={{ __html: data.content }} />}
            </main>
            <footer className={styles.footer}>This is a footer</footer>
        </div>
    );
};
export default Page;
