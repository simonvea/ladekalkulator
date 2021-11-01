import { ProviderInfo } from './findCheapestProvider';

export const prices: ProviderInfo[] = [
  {
    name: 'Fortum',
    id: 1,
    50: { kWt: 0, minute: 3.1 },
    22: { kWt: 3, minute: 0 },
    125: { kWt: 5, minute: 1 },
    200: { kWt: 5, minute: 0 },
  },
  {
    name: 'Circle K',
    id: 2,
    50: { kWt: 5.39, minute: 0 },
    150: { kWt: 5.79, minute: 0 },
  },
  {
    name: 'mer',
    id: 3,
    150: { kWt: 3.75, minute: 1.25 },
    50: { kWt: 3.75, minute: 1.25 },
    22: { kWt: 2.9, minute: 0.2 },
  },
  {
    name: 'BKK',
    id: 4,
    150: { kWt: 3.65, minute: 1.25 },
    50: { kWt: 3.65, minute: 1.25 },
    22: { kWt: 2.9, minute: 0.1 },
  },
];
