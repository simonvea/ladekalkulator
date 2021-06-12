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
      <main>
        <h2>Hvor lenge må du lade?</h2>

        <label>
          Hvor mange km vil du kjøre?
          <input value={km} onChange={handleKm} type="number"></input>
        </label>
        <label>
          Hva er estimert forbruk av KWT på strekningen, per mil? (kwt/mil)
          <input
            value={kwPerMile}
            onChange={handleKwPerMile}
            type="number"
            step="0.1"
          ></input>
        </label>
        <label>
          Hvor fort kommer du til å lade (i snitt)?
          <input value={kw} onChange={handleKw} type="number"></input>
        </label>

        <p>
          Du må lade i <strong>{Math.round(time)} minutter</strong> for å kunne
          kjøre {km} km.
        </p>
        <p>
          Jeg vil anbefale at du legger til litt ekstra for å ha litt marginer.
        </p>
        <p>
          Med den hastigheten du har valgt lader du {speed.toFixed(2)} km per
          minutt.
        </p>
        <Link href="/">
          <a>Tilbake til fremsiden</a>
        </Link>
      </main>
    </>
  );
}
