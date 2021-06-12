import Head from 'next/head';
import styles from '../styles/Home.module.css';
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

      <main className={styles.main}>
        <h1> Hvor er det billigst å lade?</h1>

        <label>
          Hvilken type lader?
          <select value={charger} onChange={handleSelect}>
            {availableChargers.map((c) => (
              <option value={c} key={c}>
                {c} KW
              </option>
            ))}
          </select>
        </label>

        <SpeedCalculator charger={charger} prices={prices} />
      </main>
    </>
  );
}
