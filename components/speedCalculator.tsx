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
      <form className="my-4 flex flex-col items-center space-y-3">
        <label htmlFor="speed">Hvor fort lader du i snitt?</label>
        <div className="relative">
          <input
            name="speed"
            id="speed"
            value={speed}
            onChange={handleSpeedInput}
            type="number"
            max={charger}
            className="w-16"
          ></input>
          <span className="absolute right-5">kW</span>
        </div>
      </form>
      <section className="flex space-x-1 items-baseline my-4">
        <h3 className="text-lg mr-2">Billigst:</h3>
        <strong>{cheapest}</strong>
      </section>
      <section>
        <h3 className="text-lg font-medium underline">Priser</h3>
        <div className="overflow-x-auto max-w-xs shadow border-b border-gray-200 sm:rounded-lg mt-4 ">
          <table className="divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  per minutt
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  15 min
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  30 min
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  45 min
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  60 min
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 divide-x">
              {pricePerMinute.map((p) => (
                <tr key={p.name}>
                  <th
                    scope="row"
                    className="text-left text-m text-gray-600 font-medium px-3"
                  >
                    {p.name}
                  </th>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {p.price.toFixed(2)} kr
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {priceForTime(p.price, 15)} kr
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {priceForTime(p.price, 30)} kr
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {priceForTime(p.price, 45)} kr
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {priceForTime(p.price, 60)} kr
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default SpeedCalculator;
