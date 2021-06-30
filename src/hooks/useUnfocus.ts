import { RefObject, useEffect } from 'react';

// Improved version with keyboard support of https://codesandbox.io/s/opmco?file=/src/useClickOutside.js
const useUnfocus = (ref: RefObject<HTMLElement>, handler: (event?: Event) => void): void => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted: HTMLElement | null;

    const listener = (event: MouseEvent): void => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;
      // Do nothing if clicking ref's element or descendent elements
      if (ref.current?.contains(event.target as Node)) return;

      handler(event);
    };

    const keyboardListener = (event: KeyboardEvent): void => {
      if (event.code !== 'Escape') return;
      handler(event);
    };

    const validateEventStart = (event: TouchEvent | MouseEvent): void => {
      startedWhenMounted = ref.current;
      startedInside = ref.current?.contains(event.target as Node) || false;
    };

    document.addEventListener('mousedown', validateEventStart);
    document.addEventListener('touchstart', validateEventStart);
    document.addEventListener('click', listener);
    document.addEventListener('keydown', keyboardListener);

    return (): void => {
      document.removeEventListener('mousedown', validateEventStart);
      document.removeEventListener('touchstart', validateEventStart);
      document.removeEventListener('click', listener);
      document.removeEventListener('keydown', keyboardListener);
    };
  }, [ref, handler]);
};

export default useUnfocus;
