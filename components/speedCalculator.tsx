import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import {
  Charger,
  getCheapest,
  getPricePrMinute,
  Provider,
  ProviderInfo,
  PriceInfoPer,
  addDiscount,
} from '../business/findCheapestProvider';

export type SpeedCalculatorProps = {
  charger: Charger;
  prices: ProviderInfo[];
};

const SpeedCalculator: FC<SpeedCalculatorProps> = ({ charger, prices }) => {
  const [speed, setSpeed] = useState<number>(charger);
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountProvider, setDiscountProvider] = useState<Provider>('mer');
  const [discountPercent, setDiscountPercent] = useState('10');

  useEffect(() => {
    if (speed > charger) {
      setSpeed(charger);
    }
  }, [charger]);

  const handleSpeedInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Math.min(Number.parseInt(event.target.value, 10), charger);
    setSpeed(newSpeed);
  };

  const handleDiscountSelect = () => setShowDiscount(!showDiscount);

  const handleDiscountProviderSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setDiscountProvider(e.target.value as Provider);

  const handleDiscountPercent = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number.parseInt(e.target.value);
    if (value > 100) value = 100;
    if (value < 0) value = 0;

    setDiscountPercent(value.toString());
  };

  const calculateDiscount = useCallback(
    () =>
      prices.map((provider) => {
        if (provider.name === discountProvider) {
          return addDiscount(provider, Number.parseInt(discountPercent));
        }
        return provider;
      }),
    [discountPercent, discountProvider]
  );

  const pricesWithdiscount = showDiscount ? calculateDiscount() : prices;

  const pricePerMinute = getPricePrMinute(pricesWithdiscount, charger, speed);

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
            className="w-24 py-2 pl-2 pr-1"
          ></input>
          <span className="absolute right-6 pt-2">kW</span>
        </div>
        <p>Kalkulatoren antar at du betaler via app og ikke dropin/SMS.</p>
        <div className="flex space-x-12 self-start w-72 items-center">
          <label htmlFor="discountSelect">Har du noen rabatter?</label>
          <input
            name="discountSelect"
            id="discountSelect"
            type="checkbox"
            checked={showDiscount}
            onChange={handleDiscountSelect}
            className="h-6 w-6 mr-4"
          ></input>
        </div>
        <section
          className={`flex justify-center items-center space-x-8 ${
            showDiscount ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col space-y-3">
            <label htmlFor="discountProvider">Hvilken operatør?</label>
            <select
              name="discountProvider"
              id="discountProvider"
              value={discountProvider}
              onChange={handleDiscountProviderSelect}
            >
              {(['BKK', 'Circle K', 'Fortum', 'mer'] as Provider[]).map(
                (provider) => (
                  <option value={provider} key={provider}>
                    {provider}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label htmlFor="discountAmount">Hvor mye?</label>
            <div className="relative">
              <span className="absolute right-6 pt-2">%</span>
              <input
                name="discountAmount"
                id="discountAmount"
                type="number"
                className="w-24 py-2 pl-2 pr-1"
                value={discountPercent}
                onChange={handleDiscountPercent}
              ></input>
            </div>
          </div>
        </section>
      </form>
      <section className="flex space-x-1 items-baseline my-4">
        <h3 className="text-lg mr-2">Billigst:</h3>
        <strong>{cheapest}</strong>
      </section>
      <section>
        <h3 className="text-lg font-medium underline">Priser</h3>
        <div className="overflow-x-auto max-w-xs sm:max-w-max shadow border-b border-gray-200 sm:rounded-lg mt-4 ">
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
