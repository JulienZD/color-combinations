import Layout from "../components/layout";
import Head from "next/head";
import ColorPreviewer from "@components/colors/ColorPreviewer";

interface Props {
  initialColors?: string[];
  shared: boolean;
}

export default function Home({ shared, initialColors = ['#000', '#fff']}: Props) {
  return (
    <Layout>
      <Head>
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.2.2/font/bootstrap-icons.css"
          as="style"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.2.2/font/bootstrap-icons.css" />
        {!shared && (
          <meta
            property="og:description"
            content="View all combinations of your favorite colors in a simple overview."
            key="og:description"
          />
        )}
      </Head>
      <div className="mx-auto max-w-6xl">
        <div className="sm:w-7/12 sm:mx-auto">
          <p className="mt-2 mb-2">
            View all combinations for any{' '}
            <a href="https://en.wikipedia.org/wiki/Web_colors#Hex_triplet">
              hex color values
            </a>{' '}
            you enter.
          </p>
          <p className="mb-2">
            The preview will automatically update as long as you enter more than two unique colors.
          </p>
          <p>
            The preview filters out combinations with a contrast ratio that doesn't meet the{' '}
            <a href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast">
              <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>
            </a>{' '}
            standards.
          </p>
        </div>
        <ColorPreviewer initialColors={initialColors} />
      </div>
    </Layout>
  )
}
