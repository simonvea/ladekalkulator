import Head from 'next/head';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import {
  getChargingSpeedInKMMinute,
  getTimeForDistance,
  kmPrkWTokWPrKm,
  kWprKmTokmPrkW,
} from '../business/calculateTimeForDistance';
import timeToString from '../business/timeToString';

export default function Tid() {
  const [km, setKm] = useState(10);
  const [kw, setKw] = useState(20);

  const [consumption, setConsumption] = useState({
    kwPerMile: '1.4',
    kmPerkWt: kWprKmTokmPrkW(0.14).toFixed(1),
  });

  const handleKm = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setKm(Number.parseInt(target.value.slice(0, 4), 10));

  const handleKwPerMile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const kwPerMile = target.value.slice(0, 3);
    const kmPerkWt = kWprKmTokmPrkW(Number.parseFloat(kwPerMile) / 10).toFixed(
      1
    );
    setConsumption({ kwPerMile, kmPerkWt });
  };

  const handlekmPerkWt = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const kmPerkWt = target.value.slice(0, 3);
    const kwPerMile = (
      kmPrkWTokWPrKm(Number.parseFloat(kmPerkWt)) * 10
    ).toFixed(1);
    setConsumption({ kmPerkWt, kwPerMile });
  };

  const handleKw = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setKw(Number.parseInt(target.value.slice(0, 3), 10));

  const speed = getChargingSpeedInKMMinute(
    Number.parseFloat(consumption.kwPerMile),
    kw
  );
  const time = getTimeForDistance(km, speed);

  return (
    <div className="flex flex-col items-center justify-around space-y-6">
      <Head>
        <title>Ladetid</title>
        <meta
          name="description"
          content="Hvor lenge må du lade for å komme x antall km?"
        />
      </Head>
      <main className="flex flex-col items-center px-6 w-full">
        <h1 className="text-xl mb-4 mt-8">Hvor lenge må du lade?</h1>

        <form className="my-4 flex flex-col items-baseline space-y-4">
          <label htmlFor="km">Hvor mange km vil du kjøre?</label>
          <div className="relative self-center">
            <span className="absolute right-6 pt-2">km</span>
            <input
              name="km"
              id="km"
              value={km}
              onChange={handleKm}
              type="number"
              className="w-28 py-2 pl-2 pr-1"
            ></input>
          </div>
          <label htmlFor="kWt">Hva er estimert forbruk på strekningen?</label>
          <div>
            <div className="relative self-center">
              <span className="absolute right-6 pt-2">kWt/mil</span>
              <input
                name="kWt"
                id="kWt"
                value={consumption.kwPerMile}
                onChange={handleKwPerMile}
                type="number"
                step="0.1"
                className="w-32 py-2 pl-2 pr-1"
              ></input>
            </div>
            eller
            <div className="relative self-center">
              <span className="absolute right-6 pt-2">km/kW</span>
              <input
                name="kmkW"
                id="kmKw"
                value={consumption.kmPerkWt}
                onChange={handlekmPerkWt}
                type="number"
                step="0.1"
                className="w-32 py-2 pl-2 pr-1"
              ></input>
            </div>
          </div>
          <label htmlFor="kw">Hvor fort kommer du til å lade (i snitt)?</label>
          <div className="relative self-center">
            <span className="absolute right-6 pt-2">kW</span>
            <input
              name="kw"
              id="kw"
              value={kw}
              onChange={handleKw}
              type="number"
              className="w-24 py-2 pl-2 pr-1"
            ></input>{' '}
          </div>
        </form>
        <section className="border-t-2 pt-8">
          <p className="my-2">
            Du må lade i <strong>{timeToString(time)}</strong> for å kunne kjøre{' '}
            {km} km.
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
      <footer className="flex justify-center items-center w-full mb-8">
        <Link href="/">
          <a className="p-3 bg-gray-300 rounded">Tilbake til fremsiden</a>
        </Link>
      </footer>
    </div>
  );
}
