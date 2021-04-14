interface Props {
  onSelection: (newColor: string) => void;
}

export default function AddColorButton({ onSelection }: Props): JSX.Element {
  const addColor = (): void => onSelection('#fff');
  return (
    <button
      className="grid place-content-center p-1 hover:text-secondary transition-colors duration-200"
      onClick={addColor}
    >
      <span className="material-icons text-5xl">add_circle</span>{' '}
    </button>
  );
}
