export enum ButtonStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline',
}

export interface BaseButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
  icon?: string;
  style?: ButtonStyle;
}

function getStyle(style: ButtonStyle): string {
  switch (style) {
    case ButtonStyle.PRIMARY:
      return 'border-transparent bg-secondary text-primary hover:bg-primary hover:text-secondary hover:border-secondary';
    case ButtonStyle.SECONDARY:
      return 'bg-primary text-secondary border-secondary hover:bg-secondary hover:text-primary';
    case ButtonStyle.OUTLINE:
      return 'border-secondary bg-transparent text-secondary hover:bg-primary';
  }
}

export function Button({ className, onClick, icon, label, style = ButtonStyle.PRIMARY }: BaseButtonProps): JSX.Element {
  const usedStyle = getStyle(style);

  return (
    <button
      className={`border py-2 md:py-1 px-4 my-1 rounded flex items-center justify-center transition-colors duration-300 focus:ring focus:ring-blue-400 ${usedStyle} ${className}`}
      onClick={(): void => onClick()}
    >
      {icon && <span className={`material-icons text-base ${label && 'mr-2'}`}>{icon}</span>}
      {label && <span className="text-md">{label}</span>}
    </button>
  );
}
