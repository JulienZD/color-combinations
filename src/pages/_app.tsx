import { AppProps } from 'next/app';
import '../styles/global.css';
import { createContext, useEffect, useState } from 'react';

interface ThemeContext {
  theme: 'light' | 'dark';
  swapTheme: (() => void) | undefined;
}

export const ThemeContext = createContext<ThemeContext>({
  theme: 'light',
  swapTheme: undefined,
});

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const schema = '(prefers-color-scheme: dark)';

  function swapTheme(): void {
    setThemeContext(() => {
      const newTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
      if (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia(schema).matches)
      ) {
        document.documentElement.removeAttribute('class');
      } else {
        document.documentElement.classList.add('dark');
      }
      localStorage.setItem('theme', newTheme);

      return {
        theme: newTheme,
        swapTheme,
      };
    });
  }

  const [themeContext, setThemeContext] = useState<ThemeContext>({
    theme: 'light',
    swapTheme,
  });

  useEffect(() => {
    const initialTheme =
      localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia(schema).matches)
        ? 'dark'
        : 'light';
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    localStorage.setItem('theme', initialTheme);

    setThemeContext({
      theme: initialTheme,
      swapTheme,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeContext.Provider value={themeContext}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
