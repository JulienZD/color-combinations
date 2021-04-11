interface Props {
  className?: string;
}

export default function PickableColors({ className }: Props): JSX.Element {
  return (
    <div className={`${className} grid content place-content-center border border-secondary`}>
      <div>Pickable Color Cards</div>
    </div>
  );
}
