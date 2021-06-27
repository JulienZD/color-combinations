import { AppProps } from 'next/app';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
