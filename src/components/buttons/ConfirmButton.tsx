import { Button, BaseButtonProps } from './Button';

export default function ConfirmButton({ onClick, style, text = 'OK' }: BaseButtonProps): JSX.Element {
  return <Button onClick={onClick} text={text} icon="check" style={style} />;
}
