import { ProviderInfo } from './findCheapestProvider';

// TODO: Legg til dato for sist oppdatert!

export const prices: ProviderInfo[] = [
  {
    name: 'Fortum/Recharge',
    id: 1,
    22: { kWt: 6.99, minute: 0 }, // Koster 0.5 kr per minutt etter sju timer
    50: { kWt: 8.49, minute: 0 },
    125: { kWt: 8.99, minute: 0 }, // Koster .5 kr per minutt etter 45 minutt
    200: { kWt: 8.99, minute: 0 },
  },
  {
    name: 'Circle K',
    id: 2,
    22: { kWt: 6.99, minute: 0 },
    50: { kWt: 8.59, minute: 0 },
    150: { kWt: 8.99, minute: 0 },
  },
  {
    name: 'Mer',
    id: 3,
    150: { kWt: 9.39, minute: 0 },
    50: { kWt: 9.39, minute: 0 },
    22: { kWt: 7.25, minute: 0 },
  },
  {
    name: 'Eviny',
    id: 4,
    150: { kWt: 6.39, minute: 0 },
    22: { kWt: 3.99, minute: 0 },
  },
  {
    name: 'Ionity',
    id: 5,
    350: { kWt: 8.4, minute: 0 },
  },
  {
    name: 'E.ON',
    id: 6,
    22: { kWt: 2.5, minute: 0 },
    50: { kWt: 4, minute: 0 },
    150: { kWt: 5.1, minute: 0 },
  },
  {
    name: 'Kople',
    id: 7,
    22: { kWt: 6.24, minute: 0 },
    50: { kWt: 7.76, minute: 0 },
    150: { kWt: 7.96, minute: 0 },
  },
  {
    name: 'Supercharge',
    id: 8,
    50: { kWt: 7.55, minute: 0 },
    150: { kWt: 7.55, minute: 0 },
  },
];
