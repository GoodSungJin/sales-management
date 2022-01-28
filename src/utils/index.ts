import { DailySales } from '../recoil/type';

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

export const buildSalesToKakaoString = ({
  store,
  date,
  products,
}: DailySales) => {
  const header = `${date.getMonth() + 1}월${date.getDate()}일 매출보고 
매  장  명 : ${store}`;
  const body = products.map(
    (item, idx) => `${idx ? '■ 서브제품' : '▶️ 메인행사'} : ${item.name}
  판매수량 :  ${item.price}×${item.quantity}
  판매금액 :  ${(item.price * item.quantity).toLocaleString()}`
  );
  const totalPrice = products
    .reduce((accu, curr) => accu + curr.quantity * curr.price, 0)
    .toLocaleString();
  const price = `총합산금액:  ${totalPrice}원`;
  const footer = `퇴근시간:  7시퇴근합니다`;

  return [header, ...body, price, footer].join('\n\n');
};
