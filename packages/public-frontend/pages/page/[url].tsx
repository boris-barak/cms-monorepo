import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { GetStaticPropsContext } from 'next';

export type PageOverview = {
    title: string;
    url: string;
};

export type PageDetail = PageOverview & {
    keywords?: ReadonlyArray<string>;
    content: string;
};

type Props = { data?: PageDetail };

export const getStaticProps = async (context: GetStaticPropsContext) => {
    console.log('url', context.params?.url ?? '');

    const url = context.params?.url ?? '';

    const res = await fetch(`http://localhost:3001/pages/detail/${url}`);

    const data = await res.json();
    return {
        props: {
            data,
        },
    };
};

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

const Page: React.FunctionComponent<Props> = ({ data }: Props) => (
    <div className={styles.container}>
        {data && (
            <>
                <Head>
                    <title>Create Next App {data.title}</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="keywords" content={data.keywords?.join(', ') ?? undefined} />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>{data.title}</h1>

                    <p className={styles.description} dangerouslySetInnerHTML={{ __html: data.content }} />
                </main>
            </>
        )}
        <footer className={styles.footer}>This is a footer</footer>
    </div>
);
export default Page;
