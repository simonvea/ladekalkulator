import { ProviderInfo } from './findCheapestProvider';

// TODO: Legg til dato for sist oppdatert!

export const prices: ProviderInfo[] = [
  {
    name: 'Fortum/Recharge',
    id: 1,
    normal: { kWt: 6.99, minute: 0 }, // Koster 0.5 kr per minutt etter sju timer
    hurtig: { kWt: 8.49, minute: 0 },
    lyn: { kWt: 8.99, minute: 0 }, // Koster .5 kr per minutt etter 45 minutt
  },
  {
    name: 'Circle K',
    id: 2,
    normal: { kWt: 6.99, minute: 0 },
    hurtig: { kWt: 8.59, minute: 0 },
    lyn: { kWt: 8.99, minute: 0 },
  },
  {
    name: 'Mer',
    id: 3,
    lyn: { kWt: 9.39, minute: 0 },
    hurtig: { kWt: 9.39, minute: 0 },
    normal: { kWt: 7.25, minute: 0 },
  },
  {
    name: 'Eviny',
    id: 4,
    lyn: { kWt: 6.39, minute: 0 },
    normal: { kWt: 3.99, minute: 0 },
  },
  {
    name: 'Ionity',
    id: 5,
    lyn: { kWt: 8.4, minute: 0 },
  },
  {
    name: 'E.ON',
    id: 6,
    normal: { kWt: 2.5, minute: 0 },
    hurtig: { kWt: 4, minute: 0 },
    lyn: { kWt: 5.1, minute: 0 },
  },
  {
    name: 'Kople',
    id: 7,
    normal: { kWt: 6.24, minute: 0 },
    hurtig: { kWt: 7.76, minute: 0 },
    lyn: { kWt: 7.96, minute: 0 },
  },
  {
    name: 'Supercharge',
    id: 8,
    hurtig: { kWt: 7.55, minute: 0 },
    lyn: { kWt: 7.55, minute: 0 },
  },
];
