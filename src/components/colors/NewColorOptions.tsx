import AddColorButton from '@components/colors/AddColorButton';
import ImportColorButton from '@components/colors/ImportColorButton';

interface Props {
  onNewSelection: (newColor: string) => void;
  onImport: () => void;
}

export default function NewColorOptions({ onNewSelection, onImport }: Props): JSX.Element {
  return (
    <>
      <div className="mx-1 h-32 pb-7 flex justify-around items-center ">
        <AddColorButton onSelection={onNewSelection} />
        {/*<ImportColorButton onImport={onImport} />*/}
      </div>
    </>
  );
}
