import { MAT101_MIDTERMS_RECENT } from './mat101MidtermsRecent';
import { MAT101_MIDTERMS_2223 } from './mat101Midterms2223';
import { MAT101PastMidtermPaper } from '../types/mat101';

export const MAT101_PAST_MIDTERMS: MAT101PastMidtermPaper[] = [
  ...MAT101_MIDTERMS_RECENT,
  ...MAT101_MIDTERMS_2223,
];
