import Head from 'next/head';
import Link from 'next/link';
import { Charger } from '../business/findCheapestProvider';
import { prices } from '../business/data';
import { ChangeEvent, useState } from 'react';
import SpeedCalculator from '../components/speedCalculator';

export default function Billigst() {
  const [charger, setCharger] = useState<Charger>(50);
  const availableChargers: Charger[] = [22, 50];

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setCharger(Number(e.target.value) as Charger);

  return (
    <>
      <Head>
        <title>Billigste ladere</title>
        <meta name="description" content="Viser de billigste lademulighetene" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center px-6 w-full">
        <h1 className="text-xl mb-4 mt-8"> Hvor er det billigst å lade?</h1>

        <form className="my-4 flex flex-col items-center space-y-4">
          <label htmlFor="charger">Hvilken type lader?</label>
          <select
            name="charger"
            id="charger"
            value={charger}
            onChange={handleSelect}
          >
            {availableChargers.map((c) => (
              <option value={c} key={c}>
                {c} kW
              </option>
            ))}
          </select>
        </form>

        <SpeedCalculator charger={charger} prices={prices} />
      </main>
      <footer className="absolute bottom-0 flex justify-center items-center w-full h-1/4">
        <Link href="/">
          <a className="p-3 bg-gray-300 rounded">Tilbake til fremsiden</a>
        </Link>
      </footer>
    </>
  );
}
