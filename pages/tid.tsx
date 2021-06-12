import Head from 'next/head';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import {
  getChargingSpeedInKMMinute,
  getTimeForDistance,
} from '../business/calculateTimeForDistance';

export default function Tid() {
  const [km, setKm] = useState(10);
  const [kwPerMile, setKwPerMile] = useState(1.4);
  const [kw, setKw] = useState(20);

  const handleKm = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setKm(Number(target.value));
  const handleKwPerMile = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setKwPerMile(Number(target.value));
  const handleKw = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setKw(Number(target.value));

  const speed = getChargingSpeedInKMMinute(kwPerMile, kw);
  const time = getTimeForDistance(km, speed);

  return (
    <>
      <Head>
        <title>Ladetid</title>
        <meta
          name="description"
          content="Hvor lenge må du lade for å komme x antall km?"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center px-6 w-full">
        <h1 className="text-xl mb-4 mt-8">Hvor lenge må du lade?</h1>

        <form className="my-4 flex flex-col items-baseline space-y-4">
          <label htmlFor="km">Hvor mange km vil du kjøre?</label>
          <div className="relative self-center">
            <input
              name="km"
              id="km"
              value={km}
              onChange={handleKm}
              type="number"
              className="w-20"
            ></input>
            <span className="absolute right-6">km</span>
          </div>
          <label htmlFor="kWt">
            Hva er estimert forbruk av kWt på strekningen, per mil?
          </label>
          <div className="relative self-center">
            <input
              name="kWt"
              id="kWt"
              value={kwPerMile}
              onChange={handleKwPerMile}
              type="number"
              step="0.1"
              className="w-28"
            ></input>
            <span className="absolute right-6">kWt/mil</span>
          </div>
          <label htmlFor="kw">Hvor fort kommer du til å lade (i snitt)?</label>
          <div className="relative self-center">
            <input
              name="kw"
              id="kw"
              value={kw}
              onChange={handleKw}
              type="number"
              className="w-20"
            ></input>{' '}
            <span className="absolute right-6">kW</span>
          </div>
        </form>
        <section className="border-t-2 pt-8">
          <p className="my-2">
            Du må lade i <strong>{Math.round(time)} minutter</strong> for å
            kunne kjøre {km} km.
          </p>
          <p className="my-2">
            Jeg vil anbefale at du legger til litt ekstra for å ha litt
            marginer.
          </p>
          <p className="my-2">
            Med den hastigheten du har valgt lader du {speed.toFixed(2)} km per
            minutt.
          </p>
        </section>
      </main>
      <footer className="absolute bottom-0 flex justify-center items-center w-full h-1/4">
        <Link href="/">
          <a className="p-3 bg-gray-300 rounded">Tilbake til fremsiden</a>
        </Link>
      </footer>
    </>
  );
}
