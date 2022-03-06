export type PriceInfoPer = {
  kWt: number;
  minute: number;
};

export type Provider =
  | 'mer'
  | 'Fortum/Recharge/Kople'
  | 'Bilkraft'
  | 'Ionity'
  | 'Circle K';

export type ProviderInfo = {
  name: Provider;
  id: number;
  22?: PriceInfoPer;
  50?: PriceInfoPer;
  100?: PriceInfoPer;
  125?: PriceInfoPer;
  150?: PriceInfoPer;
  200?: PriceInfoPer;
  225?: PriceInfoPer;
  300?: PriceInfoPer;
  350?: PriceInfoPer;
};

function pricePrMinute(priceInfo: PriceInfoPer, KWT: number) {
  const KWPrMin = KWT / 60;
  return KWPrMin * priceInfo.kWt + priceInfo.minute;
}

type PricePerMinute = {
  name: string;
  price: number;
};

export type Charger = 22 | 50 | 100 | 150 | 300 | 350;

export function getPricePrMinute(
  providers: ProviderInfo[],
  charger: Charger,
  averageChargingSpeed?: number
): PricePerMinute[] {
  const chargingSpeed = averageChargingSpeed || charger;

  return providers.reduce((prev, curr) => {
    const priceInfo = curr[charger];
    if (priceInfo) {
      prev.push({
        name: curr.name,
        price: pricePrMinute(priceInfo, chargingSpeed),
      });
    }
    return prev;
  }, []);
}

type Price = {
  name: string;
  price: number;
  id: number;
};

export function getPricePr({
  providers,
  charger,
  priceUnit,
  averageChargingSpeed,
}: {
  providers: ProviderInfo[];
  charger: Charger;
  priceUnit: 'kW' | 'minute';
  averageChargingSpeed?: number;
}): Price[] {
  const chargingSpeed = averageChargingSpeed || charger;

  return providers.reduce((prev, curr) => {
    const priceInfo = curr[charger];
    if (priceInfo) {
      prev.push({
        name: curr.name,
        id: curr.id,
        price:
          priceUnit === 'kW'
            ? pricePrkW(priceInfo, chargingSpeed)
            : pricePrMinute(priceInfo, chargingSpeed),
      });
    }
    return prev;
  }, []);
}

export function getPricePrkW(
  providers: ProviderInfo[],
  charger: Charger,
  averageChargingSpeed?: number
) {
  const chargingSpeed = averageChargingSpeed || charger;

  return providers.reduce((prev, curr) => {
    const priceInfo = curr[charger];
    if (priceInfo) {
      prev.push({
        name: curr.name,
        price: pricePrkW(priceInfo, chargingSpeed),
      });
    }
    return prev;
  }, []);
}

function pricePrkW(priceInfo: PriceInfoPer, KWT: number) {
  const minutesPrkW = 60 / KWT;
  return priceInfo.kWt + priceInfo.minute * minutesPrkW;
}

export function getCheapest(providers: PricePerMinute[]) {
  return providers.sort((a, b) => a.price - b.price)[0];
}

export function addDiscount(
  provider: ProviderInfo,
  discountPercent: number
): ProviderInfo {
  const keys = Object.keys(provider);

  const info: ProviderInfo = {
    ...provider,
  };

  keys.forEach((k) => {
    if (k !== 'name') {
      info[k] = {
        kWt: provider[k].kWt * ((100 - discountPercent) / 100),
        minute: provider[k].minute * ((100 - discountPercent) / 100),
      };
    }
  });
  return info;
}
