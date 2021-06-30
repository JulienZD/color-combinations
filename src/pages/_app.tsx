import { AppProps } from 'next/app';
import '../styles/global.css';
import ThemeProvider from '../contexts/theme';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
