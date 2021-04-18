import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ColorCombination } from 'types';
import PopoverColorPicker from '@components/colors/PopoverColorPicker';
import calcContrast from '@lib/calcContrast';

interface CardFooterProps {
  colorCombination: ColorCombination;
  swapTheme: () => void;
  setCardTheme: (newTheme: ColorCombination) => void;
  resetTheme: () => void;
}

function OutlinedButton({ color }: { color: string }): JSX.Element {
  return (
    <div
      className="btn btn-sm select-none cursor-pointer first:ml-0 mr-1 focus:ring-0 focus:ring-transparent"
      style={{ color: color, border: `1px solid ${color}` }}
      tabIndex={-1}
    >
      Button
    </div>
  );
}

function Circle({ color, onSelection }: { color: string; onSelection: (newColor: string) => void }): JSX.Element {
  return (
    <PopoverColorPicker color={color} onSelection={onSelection}>
      <div className="inline-block h-4 w-4 rounded-full ml-1" style={{ backgroundColor: color }} />
    </PopoverColorPicker>
  );
}

function ColorDescriptor({
  text,
  color,
  onSelection,
}: {
  text: string;
  color: string;
  onSelection: (newColor: string) => void;
}): JSX.Element {
  return (
    <small className="flex flex-nowrap items-center">
      <span className="whitespace-nowrap">{`${text}: ${color.toLowerCase()}`}</span>
      <Circle color={color} onSelection={onSelection} />
    </small>
  );
}

function CardFooter({ colorCombination, swapTheme, setCardTheme, resetTheme }: CardFooterProps): JSX.Element {
  const { primary, secondary, contrast } = colorCombination;
  const [copyBtn, setCopyBtnText] = useState({ icon: 'clipboard', title: 'Copy to clipboard' });
  const toClipboard = async (): Promise<void> => {
    if (copyBtn.icon !== 'clipboard') return;
    await navigator.clipboard.writeText(`background-color: ${primary};\ncolor: ${secondary};`);
    setCopyBtnText({ icon: 'check2', title: 'Copied!' });
  };

  useEffect(() => {
    if (copyBtn.icon === 'clipboard') return;
    const timeout = setTimeout(() => setCopyBtnText({ icon: 'clipboard', title: 'Copy to clipboard' }), 2000);
    return (): void => clearTimeout(timeout);
  }, [copyBtn]);

  return (
    <div className="p-2 flex justify-between text-gray-300">
      <div className="flex flex-col">
        <ColorDescriptor
          text="Primary"
          color={primary}
          onSelection={(newColor: string): void =>
            setCardTheme({
              ...colorCombination,
              primary: newColor,
              contrast: calcContrast(newColor, colorCombination.secondary),
            })
          }
        />
        <ColorDescriptor
          text="Secondary"
          color={secondary}
          onSelection={(newColor: string): void =>
            setCardTheme({
              ...colorCombination,
              secondary: newColor,
              contrast: calcContrast(colorCombination.primary, newColor),
            })
          }
        />
        <small>Contrast Ratio: {contrast}</small>
      </div>
      <div className="flex justify-end" style={{ color: 'var(--main-text)' }}>
        <button title={copyBtn.title} className="btn-link btn btn-sm" onClick={toClipboard} aria-label={copyBtn.title}>
          <i className={`bi bi-${copyBtn.icon}`} />
        </button>
        <button className="btn btn-sm btn-link" onClick={swapTheme} aria-label="Invert colors">
          <i className="bi bi-circle-half" />
        </button>
        <button className="btn btn-sm btn-link" onClick={resetTheme} aria-label="Invert colors">
          <i className="bi bi-arrow-counterclockwise" />
        </button>
      </div>
    </div>
  );
}

export default function ColorCard(props: ColorCombination): JSX.Element {
  const [theme, setTheme] = useState({
    current: props,
    previous: props,
  });
  const { primary, secondary } = theme.current;

  const swapColors = (): void =>
    setTheme((prevState) => ({
      ...prevState,
      current: { ...prevState.current, primary: secondary, secondary: primary },
    }));

  const resetTheme = (): void => {
    setTheme((prevState) => ({
      current: props,
      previous: prevState.current,
    }));
  };

  const updateTheme = (newTheme: ColorCombination): void => {
    setTheme((prevState) => ({
      current: newTheme,
      previous: prevState.current,
    }));
  };

  return (
    <article className="m-1">
      <div className="p-2 rounded-md" style={{ backgroundColor: primary, color: secondary }}>
        <hgroup>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
        </hgroup>
        <p>The quick brown fox jumps over the lazy dog</p>
        <div className="flex mt-1">
          <OutlinedButton color={secondary} />
          <div
            className="btn btn-sm mr-1 select-none cursor-pointer"
            style={{ backgroundColor: secondary, color: primary }}
            tabIndex={-1}
          >
            Button
          </div>
        </div>
      </div>
      <CardFooter
        colorCombination={theme.current}
        swapTheme={swapColors}
        resetTheme={resetTheme}
        setCardTheme={updateTheme}
      />
    </article>
  );
}
