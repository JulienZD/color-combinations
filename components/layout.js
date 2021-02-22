import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import HomeButton from '@components/HomeButton';

export default function Layout({ children, home }) {
  useEffect(() => {
    document.querySelector('body').className = 'h-100';
    document.querySelector('html').className = 'h-100';
    document.querySelector('#__next').className = 'd-flex flex-column h-100';
  });
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Hi, I'm Julien" key="og:title" />
        <meta
          property="og:description"
          content="Here you'll find the results of me tinkering around with various technologies."
          key="og:description"
        />
        <meta property="og:image" content="http://jzd.me/images/CircleJ.png" />
        <meta property="og:url" content="https://jzd.me" />
        <meta name="twitter:card" content="summary_large_image" />

        <title>Hi, I'm Julien</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.2.2/font/bootstrap-icons.css" />
      </Head>
      {!home && (
        <header>
          <nav className="navbar navbar-expand-md fixed-top">
            <HomeButton />
          </nav>
        </header>
      )}
      <main>{children}</main>
      <footer className="mt-auto text-right py-3 pr-4">
        <div className="text-right pr-2">
          {home && (
            <Link href="/colors">
              <a className="link-animated-hover mr-2">Preview Color Combinations</a>
            </Link>
          )}
          <a className="link-animated-hover" href="https://github.com/JulienZD/website">
            Source
          </a>
        </div>
      </footer>
      {!home && (
        <style jsx>{`
          main {
            padding-top: 50px;
            flex-shrink: 0 !important;
          }
        `}</style>
      )}
    </>
  );
}
