import { useCallback, useRef, useState } from 'react';
import { ColorPicker } from '@components/colors/ColorPicker';
import useUnfocus from '@hooks/useUnfocus';

interface Props {
  initialColor?: string;
  onDelete: (color: string) => void;
}

export default function SelectedColor({ onDelete, initialColor = '#CCC' }: Props): JSX.Element {
  const [color, setColor] = useState(initialColor);
  const [isOpen, setIsOpen] = useState(false);

  const squareRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => {
    setIsOpen(false);
    // Refocus the square that opened
    if (squareRef.current) squareRef.current.focus();
  }, [isOpen]);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  useUnfocus(colorPickerRef, close);

  return (
    <>
      <figure
        ref={squareRef}
        className="flex flex-col mx-1 relative h-32 group focus-visible:ring focus-visible:ring-blue-300"
        tabIndex={0}
      >
        <div
          className="flex-grow cursor-pointer border border-secondary focus-visible:ring focus-visible:ring-blue-300"
          style={{ backgroundColor: color }}
          onClick={(): void => setIsOpen(true)}
          onKeyDown={({ code }): void => {
            if (code === 'Enter' || code === 'Space') setIsOpen(true);
          }}
          tabIndex={0}
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
          {/*TODO: display delete button on color square focus */}
          {/*TODO: move animation to separate class */}
          <button
            className={`opacity-0 translate-x-2 group-hover:translate-x-0 focus-within:translate-x-0 group-focus:translate-x-0
             focus-within:opacity-100 group-hover:opacity-100 group-focus:opacity-100 transform transition-all duration-300`}
            onClick={(): void => onDelete(color)}
          >
            <span className="material-icons">delete</span>
          </button>
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
