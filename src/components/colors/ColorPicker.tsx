import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useClampInsideViewport } from '@hooks/useClampInsideViewport';

interface Props {
  color: string;
  onSelection: (newColor: string) => void;
  onCancel: () => void;
}

// TODO: position goes offscreen to the right on narrow viewports
export default function ColorPicker({ onSelection, color, onCancel }: Props): JSX.Element {
  const [currentColor, setCurrentColor] = useState(color);
  const [ref, isOutsideViewport] = useClampInsideViewport<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${
        isOutsideViewport ? 'sm:!right-12' : ''
      } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:transform-none sm:absolute sm:inset-auto flex flex-col z-[60] p-4 pb-2 shadow-sharp rounded-r-lg rounded-b-lg border border-transparent dark:border-dark-primary-400 bg-primary-100 dark:bg-dark-primary-600`}
    >
      <div className="flex">
        <HexColorPicker color={currentColor} onChange={(newColor: string): void => setCurrentColor(newColor)} />
        <div className="flex-grow w-5 ml-2 rounded" style={{ backgroundColor: currentColor }} />
      </div>
      <div className="flex justify-end items-center mt-3">
        <button className="btn btn-sm link-themed" onClick={(): void => onCancel()}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary flex items-center justify-center"
          onClick={(): void => onSelection(currentColor)}
        >
          <span className="material-icons text-base mr-2">check</span>
          Select
        </button>
      </div>
    </div>
  );
}
