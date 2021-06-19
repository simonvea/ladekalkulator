import Head from 'next/head';
import { prices } from '../business/data';
import SpeedCalculator from '../components/speedCalculator';
import Footer from '../components/footer';

export default function Billigst() {
  return (
    <div className="flex flex-col items-center justify-evenly space-y-8 min-h-screen">
      <Head>
        <title>Billigste ladere</title>
        <meta name="description" content="Viser de billigste lademulighetene" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center px-6 w-full">
        <h1 className="text-xl mb-4 mt-8"> Hvor er det billigst å lade?</h1>

        <SpeedCalculator prices={prices} />
      </main>
      <Footer showBackToHome />
    </div>
  );
}
