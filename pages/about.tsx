import { FC } from 'react';
import Head from 'next/head';
import Footer from '../components/footer';
import Header from '../components/header';

const About: FC = () => {
  return (
    <div className="min-h-screen grid grid-rows-3">
      <Head>
        <title>Om Ladekalkultor.no</title>
        <meta
          name="description"
          content="Ladekalkulatoren er laget av Simon Opheim."
        />
      </Head>
      <Header />
      <main className="flex flex-col justify-center items-center">
        <article className="text-center  max-w-md">
          <p>
            Denne nettsiden er laget av{' '}
            <a
              href="https://www.simonsier.no/about"
              rel="noreferrer noopener"
              className="underline"
            >
              Simon Opheim
            </a>
            .
          </p>

          <p className="mt-4">
            Send meg gjerne et{' '}
            <a
              href="mailto:simon@ordsky.no"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              elektronisk brev
            </a>{' '}
            om du er noe du lurer på eller har andre tilbakemeldinger.
          </p>
        </article>
        <aside className="mt-8">
          Ladepriser sist oppdatert{' '}
          <time dateTime="2022-03-06">06.03.2022</time>.
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default About;
