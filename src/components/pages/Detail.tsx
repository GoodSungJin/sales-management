import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReadCell } from '../../api/spreadSheet';
import TemplateCalendar from '../templates/Calendar';

function PageDetail() {
  const { id: spreadsheetID } = useParams<'id'>();

  const [currSpreadsheet, setCurrSpreadsheet] = useState<Row[]>([]);
  const [formattedSales, setFormattedSales] = useState<DailySale[]>();

  useEffect(() => {
    init();
  }, [spreadsheetID]);

  useEffect(() => {
    setFormattedSales(
      buildDailySales(currSpreadsheet).filter((_, idx) => idx !== 0)
    );
    // setFormattedSales(buildDailySales(currSpreadsheet));

    console.log(buildDailySales(currSpreadsheet).filter((_, idx) => idx !== 0));
  }, [currSpreadsheet]);

  const init = async () => {
    const res = await fetchReadCell(spreadsheetID || '');

    setCurrSpreadsheet(res.values);
  };

  const buildDailySales = (values: Row[]) =>
    values.reduce((accu, curr, currIdx) => {
      const [userName, store, date, productName, quantity, price, totalPrice] =
        curr;
      if (!userName) return accu;

      const prevItem = accu.length - 1 < 0 ? null : accu[accu.length - 1];
      const product = { name: productName, quantity: +quantity, price: +price };

      if (prevItem?.date === date) {
        const sameEl = accu.filter(
          (item, idx, self) => idx !== self.length - 1
        );

        return [
          ...sameEl,
          {
            ...prevItem,
            products: [...prevItem.products, product],
          } as DailySale,
        ];
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
    }, [] as DailySale[]);

  return (
    <div>
      <h1>DETIAL</h1>
      <TemplateCalendar />
      {currSpreadsheet.map((item) => (
        <div>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
}

export default PageDetail;

type Row = string[];

interface DailySale {
  userName: string;
  date: string;
  store: string;
  products: Product[];
}

interface Product {
  name: string;
  quantity: number;
  price: number;
}
