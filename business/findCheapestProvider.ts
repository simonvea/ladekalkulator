export type PriceInfoPer = {
  kWt: number;
  minute: number;
};

export type Provider =
  | 'Mer'
  | 'Fortum/Recharge'
  | 'Eviny'
  | 'Ionity'
  | 'Circle K'
  | 'E.ON'
  | 'Kople'
  | 'Supercharge';

export type ProviderInfo = {
  name: Provider;
  id: number;
  normal?: PriceInfoPer;
  hurtig?: PriceInfoPer;
  lyn?: PriceInfoPer;
};

function pricePrMinute(priceInfo: PriceInfoPer, KWT: number) {
  const KWPrMin = KWT / 60;
  return KWPrMin * priceInfo.kWt + priceInfo.minute;
}

type PricePerMinute = {
  name: string;
  price: number;
};

export type Charger = 'normal' | 'hurtig' | 'lyn';

export function toSpeed(charger: Charger) {
  switch (charger) {
    case 'normal':
      return 22;
    case 'hurtig':
      return 50;
    case 'lyn':
      return 350;
  }
}

export function getPricePrMinute(
  providers: ProviderInfo[],
  charger: Charger,
  averageChargingSpeed?: number
): PricePerMinute[] {
  const chargingSpeed = averageChargingSpeed || toSpeed(charger);

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

//Todo: bruk høyere hastighet hvis den valgte ikke er tilgjengelig -> Evt endre basert på hastighet
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
    // check if charger is available
    const canChargeAtSpeed = !!curr[charger];

    if (!canChargeAtSpeed) return prev;

    const availableSpeed = toSpeed(charger);

    const chargingSpeed =
      averageChargingSpeed && averageChargingSpeed < availableSpeed
        ? averageChargingSpeed
        : availableSpeed;

    prev.push({
      name: curr.name,
      id: curr.id,
      price:
        priceUnit === 'kW'
          ? curr[charger].kWt
          : pricePrMinute(curr[charger], chargingSpeed),
    });

    return prev;
  }, []);
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
