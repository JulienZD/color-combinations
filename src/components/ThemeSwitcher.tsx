import { useCallback } from 'react';
import { useTheme } from '../contexts/theme';

export default function ThemeSwitcher(): JSX.Element | null {
  const { theme, swapTheme } = useTheme();
  const swap = useCallback(() => {
    if (swapTheme) swapTheme();
  }, [swapTheme]);
  return theme ? <button onClick={swap}>{theme === 'dark' ? 'Light' : 'Dark'} mode</button> : null;
}
