import { ForwardedRef, forwardRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface Props {
  color: string;
  onSelection: (newColor: string) => void;
  onCancel: () => void;
}

export type Ref = HTMLDivElement;

// TODO: position goes offscreen to the right on narrow viewports
export const ColorPicker = forwardRef<Ref, Props>(({ onSelection, color, onCancel }: Props, ref: ForwardedRef<Ref>) => {
  const [currentColor, setCurrentColor] = useState(color);

  return (
    <>
      <div
        ref={ref}
        className="absolute flex flex-col z-[60] p-4 pb-2 shadow-sharp rounded-r-lg rounded-b-lg border border-transparent dark:border-dark-primary-400 bg-primary-100 dark:bg-dark-primary-600"
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
    </>
  );
});
