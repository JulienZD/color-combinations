import SelectedColor from '@components/colors/SelectedColor';
import NewColorOptions from '@components/colors/NewColorOptions';
import { useCallback, useEffect } from 'react';

interface Props {
  colors: string[];
  onDelete: (color: string) => void;
  className?: string;
  addColor: (newColor: string) => void;
  updateColor: (color: string, newColor: string) => void;
}

export default function SelectedColorsManager({
  colors,
  onDelete,
  updateColor,
  className,
  addColor,
}: Props): JSX.Element {
  const hexColors = colors.filter((c) => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/));

  const urlColors = useCallback(() => {
    return hexColors.map((c) => c.replace('#', '')).join('-');
  }, [hexColors]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.history.replaceState(window.history.state, '', `/colors/${urlColors()}`);
  }, [hexColors, urlColors]);

  const newSelection = useCallback((newColor: string): void => addColor(newColor), []);

  const importColors = useCallback((): void => {
    alert('importing');
  }, []);
  return (
    <fieldset className={className}>
      <legend className="mb-2">Select your colors</legend>
      <div className="bg-primary-200 dark:bg-dark-primary-700 px-1 py-2 rounded h-full grid content gap-y-2 grid-cols-2 sm:grid-cols-4 ">
        {colors.map((color) => (
          <SelectedColor key={color} initialColor={color} onDelete={onDelete} onUpdate={updateColor} />
        ))}
        <NewColorOptions onNewSelection={newSelection} onImport={importColors} />
      </div>
    </fieldset>
  );
}
