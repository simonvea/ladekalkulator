import { ProviderInfo } from './findCheapestProvider';

export const prices: ProviderInfo[] = [
  {
    name: 'Fortum',
    50: { kWt: 0, minute: 3.1 },
    22: { kWt: 3, minute: 0 },
    125: { kWt: 3.2, minute: 1 },
    200: { kWt: 3.2, minute: 1.25 },
  },
  {
    name: 'Cicle K',
    50: { kWt: 4.49, minute: 0 },
    150: { kWt: 4.99, minute: 0 },
  },
  {
    name: 'mer',
    150: { kWt: 3.2, minute: 0 },
    50: { kWt: 3.2, minute: 1.25 },
    22: { kWt: 2.9, minute: 0.1 },
  },
  {
    name: 'BKK',
    150: { kWt: 3.2, minute: 1.25 },
    50: { kWt: 3.2, minute: 1.25 },
    22: { kWt: 2.9, minute: 0.1 },
  },
];
