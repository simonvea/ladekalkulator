export function getTimeForDistance(distanceInKm: number, kmPerMinute: number) {
  return distanceInKm / kmPerMinute;
}

export function getChargingSpeedInKMMinute(
  consumptionInKW: number,
  chargingSpeedInKW: number
) {
  const kwPerKm = consumptionInKW / 10;
  const kwPerMinute = chargingSpeedInKW / 60;
  return kwPerMinute / kwPerKm;
}

export function kmPrkWTokWPrKm(kmPrKw: number) {
  if (typeof kmPrKw === 'number') {
    return 1 / kmPrKw;
  }
  return 0;
}

export function kWprKmTokmPrkW(kWprKm: number) {
  if (typeof kWprKm === 'number') {
    return 1 / kWprKm;
  }
  return 0;
}
