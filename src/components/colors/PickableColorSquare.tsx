import { useCallback, useRef, useState } from 'react';
import { ColorPicker } from '@components/colors/ColorPicker';
import useUnfocus from '@hooks/useUnfocus';

interface Props {
  initialColor?: string;
  onDelete: (color: string) => void;
}

export default function PickableColorSquare({ onDelete, initialColor = '#CCC' }: Props): JSX.Element {
  const [color, setColor] = useState(initialColor);
  const [isOpen, toggle] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => toggle(false), [color]);
  useUnfocus(colorPickerRef, close);
  return (
    <>
      <figure className="flex flex-col mx-1 relative h-32">
        <div
          className="flex-grow cursor-pointer border border-secondary"
          style={{ backgroundColor: color }}
          onClick={(): void => toggle(true)}
        />
        {isOpen && (
          <ColorPicker
            ref={colorPickerRef}
            onCancel={close}
            onSelection={(newColor: string): void => {
              setColor(newColor);
              close();
            }}
            color={color}
          />
        )}
        <footer className="flex justify-between">
          <figcaption>{color?.toUpperCase()}</figcaption>
          {/*TODO: only display delete button on focus-within*/}
          <span className="material-icons" role="button" onClick={(): void => onDelete(color)}>
            delete
          </span>
        </footer>
      </figure>
      <style jsx>{`
        .picker {
          position: relative;
        }

        .popover {
          position: absolute;
          left: 0;
          top: calc(100% + 2px);
          border-radius: 9px;
          z-index: 500;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
}
