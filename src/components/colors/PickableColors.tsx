import PickableColorSquare from '@components/colors/PickableColorSquare';

interface Props {
  colors: string[];
  onDelete: (color: string) => void;
  className?: string;
}

export default function PickableColors({ colors, onDelete, className }: Props): JSX.Element {
  return (
    <fieldset className={className}>
      <legend className="mb-2">Select your colors</legend>
      <div className="h-full grid content gap-y-2 grid-cols-2 sm:grid-cols-4">
        {colors.map((color) => (
          <PickableColorSquare key={color} initialColor={color} onDelete={onDelete} />
        ))}
      </div>
    </fieldset>
  );
}
