import { DailySales } from '../recoil/type';
import { Rows } from '../apis/type';

type FnBuildDailySalesToRow = (v: Rows) => DailySales[];
type FnBuildRowsToSales = (s: DailySales) => Rows;

export const buildDailySalesToRow: FnBuildDailySalesToRow = (values) =>
  values.reduce(
    (
      accu,
      [userName, store, date, productName, quantity, price, totalPrice],
      idx
    ) => {
      if (!userName) return accu;
      const product = {
        id: idx + 1,
        name: productName,
        quantity: +quantity,
        price: +price,
      };
      const [yy, mm, dd] = date.split('-');
      const newDate = new Date(+yy, +mm - 1, +dd);
      const isIncludedSales =
        +(accu.length && accu[accu.length - 1].date) === +newDate;

      if (isIncludedSales) {
        return accu.map((item) => {
          if (+item.date === +newDate)
            return {
              ...item,
              products: [...item.products, product],
            };
          return item;
        });
      }
      return [
        ...accu,
        {
          userName,
          date: newDate,
          store,
          products: [product],
        },
      ];
    },
    [] as DailySales[]
  );

export const buildRowsToSales: FnBuildRowsToSales = ({
  store,
  products,
  userName,
  date,
}) =>
  products.map(({ price, id, name, quantity }) => [
    userName,
    store,
    `${buildYearHyphenMonthToDate(date)}-${date.getDate()}`,
    name,
    quantity.toString(),
    price.toString(),
    (quantity * price).toLocaleString(),
  ]);

export const getYearMonthDateToDate = (date: Date) => [
  date.getFullYear(),
  date.getMonth() + 1,
  date.getDate(),
];

export const buildDateToSheetTitle = (title: string) => {
  const [date] = title.split('_');

  return new Date(date);
};

export const buildYearHyphenMonthToDate = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}`;
