import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
import ColorPicker from '@components/colors/ColorPicker';
import useUnfocus from '@hooks/useUnfocus';

interface Props {
  color: string;
  onSelection: (newColor: string) => void;
  children: ReactNode;
  className?: string;
}

export default function PopoverColorPicker({ color, onSelection, children, className }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const close = (): void => setIsOpen(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useUnfocus(wrapperRef, close);

  return (
    <div ref={wrapperRef} className={`${className} relative`}>
      <div
        className="h-full w-full"
        onClick={(): void => setIsOpen(true)}
        onKeyDown={({ code }: KeyboardEvent): void => {
          if (code === 'Enter' || code === 'Space') setIsOpen(true);
        }}
      >
        {children}
      </div>
      {isOpen && (
        <ColorPicker
          color={color}
          onSelection={(newColor: string): void => {
            onSelection(newColor);
            close();
          }}
          onCancel={close}
        />
      )}
    </div>
  );
}
