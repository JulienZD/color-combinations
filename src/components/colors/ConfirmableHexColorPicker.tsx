import { ForwardedRef, forwardRef, ReactNode, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ButtonStyle, ConfirmButton } from '@components/buttons';

interface Props {
  children?: ReactNode;
  onChange: (newColor: string) => void;
  color: string;
}

export type Ref = HTMLDivElement;

// TODO: position goes offscreen to the right on narrow viewports
export const ConfirmableHexColorPicker = forwardRef<Ref, Props>(
  ({ onChange, color }: Props, ref: ForwardedRef<Ref>) => {
    const [pickerColor, setPickerColor] = useState(color);

    return (
      <>
        <div ref={ref} className="wrapper p-2 absolute bg-gray-800 rounded-lg">
          <HexColorPicker color={pickerColor} onChange={(newColor: string): void => setPickerColor(newColor)} />
          <div className="flex justify-between">
            <div className="flex-grow m-2 rounded" style={{ backgroundColor: pickerColor }} />
            <ConfirmButton style={ButtonStyle.SECONDARY} onClick={(): void => onChange(pickerColor)} text={'Choose'} />
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
