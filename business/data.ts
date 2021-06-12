import { ProviderInfo } from './findCheapestProvider';

export const prices: ProviderInfo[] = [
  { name: 'Fortum', 50: { kwT: 0, minute: 3.1 }, 22: { kwT: 3, minute: 0 } },
  { name: 'Cicle K', 50: { kwT: 4.49, minute: 0 } },
  {
    name: 'mer',
    50: { kwT: 3.2, minute: 1.25 },
    22: { kwT: 2.9, minute: 0.1 },
  },
  {
    name: 'BKK',
    150: { kwT: 3.2, minute: 1.25 },
    50: { kwT: 3.2, minute: 1.25 },
    22: { kwT: 2.9, minute: 0.1 },
  },
];
