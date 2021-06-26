import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';


interface Props {
  children: ReactNode;
  title?: string;
}

interface NavLinkProps {
  href: string;
  text: string;
  className?: string;
  title?: string;
}

function NavLink({ href, text, title, className = '' }: NavLinkProps): JSX.Element {
  return (
    <Link href={href}>
      <a className={`${className} link-animated-hover first:ml-0 last:mr-0 mx-2`} title={title ?? text}>
        {text}
      </a>
    </Link>
  );
}

export default function Layout({ children, title = "Color Combinator" }: Props): JSX.Element {
  const description =
    "View all combinations of your favorite colors in a simple overview.";
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} key="description" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:image" content="/images/hero-og.jpg" key="og:image" />
        <meta property="og:url" content="https://colors.jzd.me" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#071625" />
      </Head>
      <header className="container my-8 font-semibold text-lg">
        <nav className="flex justify-between">
          <NavLink href="/" text="Color Combinator" title="Home" className="sm:text-2xl" />
          <div className="flex justify-around">
            <NavLink href="https://jzd.me/about" text="About me" />
          </div>
        </nav>
      </header>
      <main className='container'>{children}</main>
      <footer className="container mt-auto">
        <div className="flex justify-end">
          <a href="https://github.com/JulienZD/color-combinations">
            Source
          </a>
        </div>
      </footer>
    </>
  );
}
