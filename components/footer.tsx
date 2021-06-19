import { FC } from 'react';
import Link from 'next/link';

type FooterProps = {
  showBackToHome?: boolean;
};

const Footer: FC<FooterProps> = ({ showBackToHome }) => {
  return (
    <footer className="flex flex-col justify-end items-center space-y-10 w-full">
      {showBackToHome && (
        <Link href="/">
          <a className="p-3 bg-gray-300 rounded">Tilbake til fremsiden</a>
        </Link>
      )}
      <section className="mb-2">
        Laget av{' '}
        <a
          href="https://www.simonsier.no/about"
          rel="noreferrer noopener"
          className="underline"
        >
          Simon Opheim
        </a>
      </section>
    </footer>
  );
};

export default Footer;
