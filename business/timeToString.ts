export default function timeToString(minutes: number) {
  let min = Math.floor(Number(minutes));
  const hours = Math.floor(min / 60);
  let timeString = '';
  if (hours > 0) {
    timeString += `${hours} time${hours !== 1 ? 'r' : ''} og `;
    min = Math.floor(min % 60);
  }
  return (timeString += `${min} minutt${min !== 1 ? 'er' : ''}`);
}
