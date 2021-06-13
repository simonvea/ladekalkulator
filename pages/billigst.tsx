import Head from 'next/head';
import Link from 'next/link';
import { Charger } from '../business/findCheapestProvider';
import { prices } from '../business/data';
import { ChangeEvent, useState } from 'react';
import SpeedCalculator from '../components/speedCalculator';

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
      <footer className="flex justify-center items-end w-full">
        <Link href="/">
          <a className="p-3 bg-gray-300 rounded">Tilbake til fremsiden</a>
        </Link>
      </footer>
    </div>
  );
}
