import { DailySale, Product } from '../recoil/type';

export type Row = string[];
export type Rows = Row[];
type FnBuildDailySalesByRow = (v: Row[]) => DailySale[];
type FnBuildRowsBySales = (s: DailySale) => Rows;

export const buildDailySalesByRow: FnBuildDailySalesByRow = (values) =>
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
      const isIncludedSales =
        accu.length && accu[accu.length - 1].date === date;

      if (isIncludedSales) {
        return accu.map((item) => {
          if (item.date === date)
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
          date,
          store,
          products: [product],
        } as DailySale,
      ];
    },
    [] as DailySale[]
  );

export const buildRowsBySales: FnBuildRowsBySales = ({
  store,
  products,
  userName,
  date,
}) =>
  products.map(({ price, id, name, quantity }) => [
    userName,
    store,
    date,
    name,
    quantity.toString(),
    price.toString(),
    (quantity * price).toLocaleString(),
  ]);
