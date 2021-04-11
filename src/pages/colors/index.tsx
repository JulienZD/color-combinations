import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Layout from '@components/layout';
import PickableColors from '@components/colors/PickableColors';
import ColorDeck from '@components/colors/ColorDeck';
import { allColorCombinations } from '@lib/allCombinations';
import ColorCard from '@components/colors/ColorCard';

interface Props {
  shared: boolean;
  initialColors?: string[];
}

function generateCards(hexColors: string[]): JSX.Element[] {
  const colorCombinations = allColorCombinations(hexColors);
  return colorCombinations
    .filter(({ contrast }) => contrast >= 4.5)
    .map(({ primary, secondary, contrast }) => (
      <ColorCard key={`${primary}${secondary}`} primary={primary} secondary={secondary} contrast={contrast} />
    ));
}

export default function Colors({ shared, initialColors = ['#000', '#fff'] }: Props): JSX.Element {
  const title = 'Preview Color Combinations';
  const [colors, setColors] = useState(initialColors);
  // TODO: Remove temp list fill
  useEffect(() => {
    setColors(['#000', '#fff', '#c3c', '#aba', '#bad', '#111', '#222', '#333']);
  }, []);

  const cardList = useMemo(() => generateCards(colors), [colors]);
  // noinspection HtmlRequiredTitleElement - title is set in Layout.tsx
  return (
    <Layout title={title}>
      <Head>
        <link rel="preload" href="https://fonts.googleapis.com/icon?family=Material+Icons" as="style" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {!shared && (
          <meta
            property="og:description"
            content="View all combinations of your favorite colors in a simple overview."
            key="og:description"
          />
        )}
      </Head>
      <h1 className="text-center mb-4">{title}</h1>
      <div className="container px-1 sm:px-0 mx-auto max-w-6xl grid grid-cols-8 gap-y-2">
        <article className="col-span-full sm:col-span-2">
          {/*TODO: Update explanation*/}
          <p className="mt-2 mb-2">
            View all combinations for any{' '}
            <a className="link-animated-hover" href="https://en.wikipedia.org/wiki/Web_colors#Hex_triplet">
              hex color values
            </a>{' '}
            you enter.
          </p>
          <p className="mb-2">
            The preview will automatically update as long as you enter more than two unique colors.
          </p>
          <p>
            The preview filters out combinations with a contrast ratio that doesn't meet the{' '}
            <a
              className="link-animated-hover"
              href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"
            >
              <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>
            </a>{' '}
            standards.
          </p>
        </article>
        <PickableColors className="col-span-full sm:col-span-6 sm:ml-4 md:ml-16 lg:ml-40" />
        <div className="col-span-full">
          <ColorDeck cards={cardList} />
        </div>
      </div>
    </Layout>
  );
}
