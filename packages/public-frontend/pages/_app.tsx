import '../styles/globals.css';
import { AppProps } from 'next/app';

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default MyApp;
