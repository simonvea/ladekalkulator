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
