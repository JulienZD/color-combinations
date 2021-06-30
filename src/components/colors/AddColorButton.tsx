import PopoverColorPicker from '@components/colors/PopoverColorPicker';

interface Props {
  onSelection: (newColor: string) => void;
}

export default function AddColorButton({ onSelection }: Props): JSX.Element {
  return (
    <PopoverColorPicker color="#FFF" onSelection={(newColor: string): void => onSelection(newColor)}>
      <button className="grid place-content-center p-1 hover:text-secondary-600 dark:hover:text-dark-secondary-400 transition-colors duration-200">
        <span className="material-icons text-5xl">add_circle</span>{' '}
      </button>
    </PopoverColorPicker>
  );
}
