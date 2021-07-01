import { RefObject, useLayoutEffect, useRef, useState } from 'react';

export function useOutOfView<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isOutOfView, setIsOutOfView] = useState(false);

  useLayoutEffect(() => {
    function checkOutOfView(): void {
      if (!ref.current) return;
      const viewWidth = Math.min(document.documentElement.clientWidth, window.innerWidth);
      const bounds = ref.current.getBoundingClientRect();

      setIsOutOfView(bounds.right > viewWidth);
    }

    checkOutOfView();

    let timer: NodeJS.Timeout;
    const debounceCheckOutOfView = (): void => {
      clearTimeout(timer);
      timer = setTimeout(checkOutOfView, 500);
    };
    window.addEventListener('resize', debounceCheckOutOfView);

    return (): void => window.removeEventListener('resize', debounceCheckOutOfView);
  }, []);

  return [ref, isOutOfView];
}
