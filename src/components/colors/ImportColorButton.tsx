interface Props {
  onImport: () => void;
}

export default function ImportColorButton({ onImport }: Props): JSX.Element {
  return (
    <button
      className="grid place-content-center p-1 hover:text-secondary-600 dark:hover:text-dark-secondary-400 transition-colors duration-200"
      onClick={onImport}
    >
      <span className="material-icons text-5xl">upload</span>{' '}
    </button>
  );
}