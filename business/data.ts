import { ProviderInfo } from './findCheapestProvider';

// TODO: Legg til dato for sist oppdatert!

export const prices: ProviderInfo[] = [
  {
    name: 'Fortum/Recharge/Kople',
    id: 1,
    22: { kWt: 3.2, minute: 0 }, // Koster 0.5 kr per minutt etter sju timer
    50: { kWt: 0, minute: 3.35 },
    125: { kWt: 5.4, minute: 0 }, // Koster .5 kr per minutt etter 45 minutt
    200: { kWt: 5.4, minute: 0 },
  },
  {
    name: 'Circle K',
    id: 2,
    22: { kWt: 4.29, minute: 0 },
    50: { kWt: 5.69, minute: 0 },
    150: { kWt: 5.99, minute: 0 },
  },
  {
    name: 'mer',
    id: 3,
    150: { kWt: 4.25, minute: 1.25 },
    50: { kWt: 4.25, minute: 1.25 },
    22: { kWt: 3.25, minute: 0.2 },
  },
  {
    name: 'Bilkraft',
    id: 4,
    150: { kWt: 3.65, minute: 1.25 },
    50: { kWt: 3.65, minute: 1.25 },
    22: { kWt: 2.9, minute: 0.1 },
  },
  {
    name: 'Ionity',
    id: 5,
    350: { kWt: 8.4, minute: 0 },
  },
];
