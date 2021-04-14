export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline',
}

export interface BaseButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
  icon?: string;
  variant?: ButtonVariant;
}

function getVariantStyle(variant: ButtonVariant): string {
  switch (variant) {
    case ButtonVariant.PRIMARY:
      return 'border-transparent bg-secondary text-primary hover:bg-primary hover:text-secondary hover:border-secondary';
    case ButtonVariant.SECONDARY:
      return 'bg-primary text-secondary border-secondary hover:bg-secondary hover:text-primary';
    case ButtonVariant.OUTLINE:
      return 'border-secondary bg-transparent text-secondary hover:bg-primary';
  }
}

export function Button({
  className,
  onClick,
  icon,
  label,
  variant = ButtonVariant.PRIMARY,
}: BaseButtonProps): JSX.Element {
  const variantStyle = getVariantStyle(variant);

  return (
    <button
      className={`border py-2 md:py-1 px-4 my-1 rounded flex items-center justify-center transition-colors duration-300 focus:ring focus:ring-blue-400 ${variantStyle} ${className}`}
      onClick={(): void => onClick()}
    >
      {icon && <span className={`material-icons text-base ${label && 'mr-2'}`}>{icon}</span>}
      {label && <span className="text-md">{label}</span>}
    </button>
  );
}
