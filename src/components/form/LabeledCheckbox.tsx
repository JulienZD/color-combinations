import { ChangeEvent } from 'react';

interface Props {
  id: string;
  name: string;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export default function LabeledCheckbox({ id, name, isChecked, onChange, label }: Props): JSX.Element {
  return (
    <div className="inline-flex items-center">
      <input type="checkbox" id={id} name={name} checked={isChecked} onChange={onChange} />
      <label htmlFor={id} className="ml-2">
        {label}
      </label>
    </div>
  );
}
