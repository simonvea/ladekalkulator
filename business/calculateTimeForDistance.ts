export function getTimeForDistance(
  distanceInKm: number,
  charginingSpeedPerMinute: number
) {
  return distanceInKm * charginingSpeedPerMinute;
}

export function getChargingSpeedInKMMinute(
  consumptionInKW: number,
  chargingSpeedInKW: number
) {
  const kwPerKm = consumptionInKW / 10;
  const kwPerMinute = chargingSpeedInKW / 60;
  return kwPerKm / kwPerMinute;
}
