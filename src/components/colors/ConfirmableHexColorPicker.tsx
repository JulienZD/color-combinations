import { ForwardedRef, forwardRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button, ButtonStyle } from '@components/buttons';

interface Props {
  color: string;
  onSelection: (newColor: string) => void;
  onCancel: () => void;
}

export type Ref = HTMLDivElement;

// TODO: position goes offscreen to the right on narrow viewports
export const ConfirmableHexColorPicker = forwardRef<Ref, Props>(
  ({ onSelection, color, onCancel }: Props, ref: ForwardedRef<Ref>) => {
    const [currentColor, setCurrentColor] = useState(color);

    return (
      <>
        <div ref={ref} className="wrapper p-2 absolute bg-gray-800 rounded-lg flex flex-col">
          <div className="flex">
            <HexColorPicker color={currentColor} onChange={(newColor: string): void => setCurrentColor(newColor)} />
            <div className="flex-grow w-5 ml-2 rounded" style={{ backgroundColor: currentColor }} />
          </div>
          <div className="flex justify-end items-center mt-3">
            <Button style={ButtonStyle.OUTLINE} className="mr-2" onClick={onCancel} label="Cancel" />
            <Button
              style={ButtonStyle.SECONDARY}
              onClick={(): void => onSelection(currentColor)}
              label="Select"
              icon="check"
            />
          </div>
        </div>
        <style jsx>{`
          .wrapper {
            z-index: 60;
          }
        `}</style>
      </>
    );
  }
);
