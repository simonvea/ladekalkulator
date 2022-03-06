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

export type Price = {
  name: string;
  price: number;
  id: number;
};

export type PriceLevel = {
  priceInfo: PriceInfoPer;
  availableSpeed: number;
};

function getPriceLevel(
  providerInfo: ProviderInfo,
  charger: Charger
): PriceLevel {
  let priceLevel: PriceLevel = {
    priceInfo: providerInfo[charger],
    availableSpeed: charger,
  };

  if (!priceLevel.priceInfo) {
    const availableChargers = Object.keys(providerInfo).filter(
      (v) => !!Number(v)
    );

    const sortedChargers = availableChargers.sort(
      (a, b) => Number(b) - Number(a)
    );

    const highestAvailableCharger = sortedChargers.find(
      (k) => Number(k) < charger
    );

    priceLevel = {
      priceInfo: providerInfo[highestAvailableCharger],
      availableSpeed: Number(highestAvailableCharger),
    };
  }

  return priceLevel;
}

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
  return providers.reduce((prev, curr) => {
    const priceLevel = getPriceLevel(curr, charger);

    if (!priceLevel.priceInfo) return prev;

    const chargingSpeed =
      averageChargingSpeed && averageChargingSpeed < priceLevel.availableSpeed
        ? averageChargingSpeed
        : priceLevel.availableSpeed;

    prev.push({
      name: curr.name,
      id: curr.id,
      price:
        priceUnit === 'kW'
          ? pricePrkW(priceLevel.priceInfo, chargingSpeed)
          : pricePrMinute(priceLevel.priceInfo, chargingSpeed),
    });

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
