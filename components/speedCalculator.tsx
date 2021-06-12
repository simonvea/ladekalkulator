import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Charger,
  getCheapest,
  getPricePrMinute,
  ProviderInfo,
} from '../business/findCheapestProvider';

export type SpeedCalculatorProps = {
  charger: Charger;
  prices: ProviderInfo[];
};

const SpeedCalculator: FC<SpeedCalculatorProps> = ({ charger, prices }) => {
  const [speed, setSpeed] = useState<number>(charger);

  useEffect(() => {
    if (speed > charger) {
      setSpeed(charger);
    }
  }, [charger]);

  const handleSpeedInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Math.min(Number(event.target.value), charger);
    setSpeed(newSpeed);
  };

  const pricePerMinute = getPricePrMinute(prices, charger, speed);

  const cheapest = getCheapest(pricePerMinute).name;

  const priceForTime = (price: number, time: number) =>
    (price * time).toFixed(2);

  return (
    <section>
      <h2>{charger}KW lader</h2>
      <form>
        <label>
          Hvor fort lader du i snitt?
          <input
            value={speed}
            onChange={handleSpeedInput}
            type="number"
            max={charger}
          ></input>
          <span>KW</span>
        </label>
      </form>
      <h3>Billigst:</h3>
      <span>{cheapest}</span>
      <h3>Priser:</h3>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>per minutt</th>
            <th>lading i 15 min</th>
            <th>lading i 30 min</th>
            <th>lading i 45 min</th>
            <th>lading i 60 min</th>
          </tr>
        </thead>
        <tbody>
          {pricePerMinute.map((p) => (
            <tr key={p.name}>
              <th scope="row">{p.name}</th>
              <td>{p.price.toFixed(2)} kr</td>
              <td>{priceForTime(p.price, 15)}</td>
              <td>{priceForTime(p.price, 30)}</td>
              <td>{priceForTime(p.price, 45)}</td>
              <td>{priceForTime(p.price, 60)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SpeedCalculator;
