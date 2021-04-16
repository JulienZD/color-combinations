import { useState } from 'react';
import PopoverColorPicker from '@components/colors/PopoverColorPicker';

interface Props {
  initialColor?: string;
  onDelete: (color: string) => void;
  onUpdate: (color: string, newColor: string) => void;
}

export default function SelectedColor({ onDelete, onUpdate, initialColor = '#CCC' }: Props): JSX.Element {
  const [color, setColor] = useState(initialColor);
  const updateColor = (newColor: string): void => {
    onUpdate(color, newColor);
    setColor(newColor);
  };
  return (
    <>
      <figure className="flex flex-col mx-1 relative h-32 group focus-visible:ring focus-visible:ring-blue-300">
        <PopoverColorPicker className="flex-grow" color={color} onSelection={updateColor}>
          <div
            className="h-full cursor-pointer border border-secondary focus-visible:ring focus-visible:ring-blue-300"
            style={{ backgroundColor: color }}
            tabIndex={0}
          />
        </PopoverColorPicker>
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
