import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import {
  Charger,
  getCheapest,
  Provider,
  ProviderInfo,
  addDiscount,
  getPricePr,
} from '../business/findCheapestProvider';

export type SpeedCalculatorProps = {
  prices: ProviderInfo[];
};

const priceForAmount = (price: number, amount: number) =>
  (price * amount).toFixed(2);

const SpeedCalculator: FC<SpeedCalculatorProps> = ({ prices }) => {
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountProvider, setDiscountProvider] = useState<Provider>('mer');
  const [discountPercent, setDiscountPercent] = useState('10');
  const [charger, setCharger] = useState<Charger>(50);
  const [speed, setSpeed] = useState<number>(charger);
  const [radio, setRadio] = useState<'tid' | 'energi'>('tid');

  useEffect(() => {
    if (speed > charger) {
      setSpeed(charger);
    }
  }, [charger, speed]);

  const availableChargers: Charger[] = [22, 50, 100, 150];

  const handleChargerSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setCharger(Number(e.target.value) as Charger);

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
    (): ProviderInfo[] =>
      prices.map((provider) => {
        if (provider.name === discountProvider) {
          return addDiscount(provider, Number.parseInt(discountPercent));
        }
        return provider;
      }),
    [discountPercent, discountProvider, prices]
  );

  const pricesWithdiscount = showDiscount ? calculateDiscount() : prices;

  const pricePer = getPricePr({
    providers: pricesWithdiscount,
    charger,
    priceUnit: radio === 'tid' ? 'minute' : 'kW',
    averageChargingSpeed: speed,
  });

  const cheapest = getCheapest(pricePer).name;

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadio(e.target.value as 'tid' | 'energi');
  };

  return (
    <section>
      <form className="my-4 flex flex-col items-center space-y-5">
        <label htmlFor="charger">Hvilken type lader?</label>
        <select
          name="charger"
          id="charger"
          value={charger}
          onChange={handleChargerSelect}
          className="p-1 border border-gray-400 outline-none focus:outline-none rounded"
        >
          {availableChargers.map((c) => (
            <option value={c} key={c}>
              {c} kW
            </option>
          ))}
        </select>
        <section className="flex flex-col items-center">
          <span>Hvordan vil du måle kostnad?</span>
          <div className="flex space-x-4 mt-2">
            <label>
              Per minutt
              <input
                type="radio"
                value="tid"
                name="type"
                onChange={handleRadioChange}
                className="ml-4"
                checked={radio === 'tid'}
              />
            </label>
            <label>
              Per kWt
              <input
                type="radio"
                value="energi"
                name="type"
                onChange={handleRadioChange}
                className="ml-4"
                checked={radio === 'energi'}
              />
            </label>
          </div>
        </section>
        <label htmlFor="speed">Hvor fort lader du i snitt?</label>
        <div className="relative">
          <input
            name="speed"
            id="speed"
            value={speed}
            onChange={handleSpeedInput}
            type="number"
            max={charger}
            className="w-24 py-1 pl-2 pr-1 border border-gray-400 outline-none focus:outline-none focus:ring rounded"
          ></input>
          <span className="absolute right-7 pt-1">kW</span>
        </div>
        <p>
          Kalkulatoren antar at du betaler via app eller brikke og ikke SMS.
        </p>
        <div className="flex space-x-12 self-start w-72 items-center">
          <label htmlFor="discountSelect">Har du noen rabatter?</label>
          <input
            name="discountSelect"
            id="discountSelect"
            type="checkbox"
            checked={showDiscount}
            onChange={handleDiscountSelect}
            className="h-6 w-6 mr-4 "
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
              className="p-1 border border-gray-400 outline-none focus:outline-none rounded"
            >
              {prices.map(({ name, id }) => (
                <option value={name} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-3">
            <label htmlFor="discountAmount">Hvor mye?</label>
            <div className="relative">
              <span className="absolute right-7 pt-1">%</span>
              <input
                name="discountAmount"
                id="discountAmount"
                type="number"
                max="100"
                className="w-24 py-1 pl-2 pr-1 border border-gray-400 outline-none focus:outline-none focus:ring rounded"
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
                  per {radio === 'tid' ? 'minutt' : 'kWt'}
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  15 {radio === 'tid' ? 'min' : 'kWt'}
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  30 {radio === 'tid' ? 'min' : 'kWt'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  45 {radio === 'tid' ? 'min' : 'kWt'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  60 {radio === 'tid' ? 'min' : 'kWt'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 divide-x">
              {pricePer.map((p) => (
                <tr key={p.id}>
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
                    {priceForAmount(p.price, 15)} kr
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {priceForAmount(p.price, 30)} kr
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {priceForAmount(p.price, 45)} kr
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {priceForAmount(p.price, 60)} kr
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside className="mt-4 max-w-lg p-2 shadow">
          ℹ️ Om jeg ikke har priser for valgt lader for en operatør, så velges
          laderen med litt lavere hastighet for den operatøren.
          Gjennomsnittshastighet blir redusert til maks tilgjengelig for den
          laderen i beregningen av pris for (kun) den operatøren.
        </aside>
      </section>
    </section>
  );
};

export default SpeedCalculator;
