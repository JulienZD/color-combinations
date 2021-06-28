import { useCallback, useContext } from 'react';
import { ThemeContext } from '../pages/_app';

export default function ThemeSwitcher(): JSX.Element {
  const { theme, swapTheme } = useContext(ThemeContext);
  const swap = useCallback(() => {
    if (swapTheme) swapTheme();
  }, [swapTheme]);
  return <button onClick={swap}>{theme === 'dark' ? 'Light' : 'Dark'} mode</button>;
}
