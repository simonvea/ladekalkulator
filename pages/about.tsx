import { FC } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

const About: FC = () => {
  return (
    <div className="min-h-screen grid grid-rows-3">
      <Header backArrow />
      <main className="flex flex-col justify-center items-center">
        <article>
          Denne nettsiden er laget av{' '}
          <a
            href="https://www.simonsier.no/about"
            rel="noreferrer noopener"
            className="underline"
          >
            Simon Opheim
          </a>
          .
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default About;
