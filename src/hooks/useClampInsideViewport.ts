import { RefObject, useEffect, useState } from 'react';

// TODO: add parameters with which classes to set if el is outside viewport
//  for example: !right-12 opacity-100
export function useClampInsideViewport(ref: RefObject<HTMLElement>): boolean[] {
  const [isOutsideViewport, setIsOutsideViewport] = useState(false);
  useEffect(() => {
    function clampViewPort(): void {
      if (!ref.current) return;
      const viewWidth = window.innerWidth;
      const bounds = ref.current.getBoundingClientRect();

      setIsOutsideViewport(bounds.right > viewWidth);
    }

    clampViewPort();

    let timer: NodeJS.Timeout;
    const debounceClampViewPort = (): void => {
      clearTimeout(timer);
      timer = setTimeout(clampViewPort, 500);
    };
    window.addEventListener('resize', debounceClampViewPort);

    return (): void => window.removeEventListener('resize', debounceClampViewPort);
  }, [ref]);

  return [isOutsideViewport];
}
