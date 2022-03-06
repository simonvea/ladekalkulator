import {
  Charger,
  getPricePr,
  Price,
  ProviderInfo,
} from './findCheapestProvider';

describe('getPricePr', () => {
  it('given no 150 charger in providers, when called with 150, then falls back to 125', () => {
    // Arrange

    const input: {
      providers: ProviderInfo[];
      charger: Charger;
      priceUnit: 'kW' | 'minute';
      averageChargingSpeed?: number;
    } = {
      providers: [
        {
          name: 'Fortum/Recharge/Kople',
          id: 1,
          22: { kWt: 3.2, minute: 0 }, // Koster 0.5 kr per minutt etter sju timer
          50: { kWt: 0, minute: 3.35 },
          125: { kWt: 5.4, minute: 0 }, // Koster .5 kr per minutt etter 45 minutt
          200: { kWt: 5.4, minute: 0 },
        },
      ],
      charger: 150,
      priceUnit: 'kW',
      averageChargingSpeed: 150,
    };

    const expected: Price = {
      name: 'Fortum/Recharge/Kople',
      id: 1,
      price: 5.4,
    };

    // Act
    const result = getPricePr(input);

    //Assert
    expect(result[0]).toEqual(expected);
  });

  it('given 150 charger in providers, when called with 150, then returns info from 150', () => {
    // Arrange

    const input: {
      providers: ProviderInfo[];
      charger: Charger;
      priceUnit: 'kW' | 'minute';
      averageChargingSpeed?: number;
    } = {
      providers: [
        {
          name: 'Fortum/Recharge/Kople',
          id: 1,
          22: { kWt: 3.2, minute: 0 }, // Koster 0.5 kr per minutt etter sju timer
          50: { kWt: 0, minute: 3.35 },
          150: { kWt: 5.4, minute: 0 }, // Koster .5 kr per minutt etter 45 minutt
          200: { kWt: 5.4, minute: 0 },
        },
      ],
      charger: 150,
      priceUnit: 'kW',
      averageChargingSpeed: 150,
    };

    const expected: Price = {
      name: 'Fortum/Recharge/Kople',
      id: 1,
      price: 5.4,
    };

    // Act
    const result = getPricePr(input);

    //Assert
    expect(result[0]).toEqual(expected);
  });
});
