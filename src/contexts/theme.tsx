import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

interface ThemeContext {
  theme: 'light' | 'dark' | undefined;
  swapTheme: (() => void) | undefined;
}

const ThemeContext = createContext<ThemeContext>({
  theme: 'light',
  swapTheme: undefined,
});

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props): JSX.Element {
  const [themeContext, setThemeContext] = useState<ThemeContext>({
    theme: undefined,
    swapTheme,
  });

  const prefersDark = useCallback(() => {
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }, []);

  function swapTheme(): void {
    setThemeContext((prev) => {
      const newTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
      if (prefersDark()) {
        document.documentElement.removeAttribute('class');
      } else {
        document.documentElement.classList.add('dark');
      }
      localStorage.setItem('theme', newTheme);

      return { ...prev, theme: newTheme };
    });
  }

  useEffect(() => {
    const initialTheme = prefersDark() ? 'dark' : 'light';
    if (initialTheme === 'dark') {
      // set class="dark" on <html> as this is how TailwindCSS's dark mode is configured
      document.documentElement.classList.add('dark');
    }

    localStorage.setItem('theme', initialTheme);
    setThemeContext((prev) => ({ ...prev, theme: initialTheme }));
  }, [prefersDark]);

  return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContext {
  return useContext(ThemeContext);
}
