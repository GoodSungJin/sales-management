import { atom } from 'recoil';
import { DailySales } from './type';

export const spreadsheetsState = atom({
  key: 'Atom/SpreadsheetsState',
  default: [],
});

export const monthlySalesData = atom<DailySales[]>({
  key: 'Atom/MonthlySalesData',
  default: [],
});
