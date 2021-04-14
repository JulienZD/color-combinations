import { ColorPicker } from '@components/colors/ColorPicker';
import { useCallback, useRef, useState } from 'react';
import useUnfocus from '@hooks/useUnfocus';

interface Props {
  onSelection: (newColor: string) => void;
}

export default function AddColorButton({ onSelection }: Props): JSX.Element {
  const addRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), [isOpen]);

  useUnfocus(addRef, close);
  return (
    <div className="relative" ref={addRef}>
      <button
        className="grid place-content-center p-1 hover:text-secondary transition-colors duration-200"
        onClick={(): void => setIsOpen(true)}
      >
        <span className="material-icons text-5xl">add_circle</span>{' '}
      </button>
      {isOpen && (
        <ColorPicker
          color="#FFF"
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
