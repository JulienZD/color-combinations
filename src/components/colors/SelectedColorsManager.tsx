import SelectedColor from '@components/colors/SelectedColor';

interface Props {
  colors: string[];
  onDelete: (color: string) => void;
  className?: string;
}

export default function SelectedColorsManager({ colors, onDelete, className }: Props): JSX.Element {
  return (
    <fieldset className={className}>
      <legend className="mb-2">Select your colors</legend>
      <div className="bg-gray-700 text-secondary-light px-1 py-2 rounded h-full grid content gap-y-2 grid-cols-2 sm:grid-cols-4 ">
        {colors.map((color) => (
          <SelectedColor key={color} initialColor={color} onDelete={onDelete} />
        ))}
      </div>
    </fieldset>
  );
}
