import { atom } from 'recoil';
import { DailySale } from './type';

export const spreadsheetsState = atom({
  key: 'Atom/SpreadsheetsState',
  default: [],
});

export const monthlySalesData = atom<DailySale[]>({
  key: 'Atom/MonthlySalesData',
  default: [],
});
