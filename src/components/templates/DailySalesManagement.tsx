import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import _ from 'lodash';
import ReactLoading from 'react-loading';

import '../../assets/styles/components/templates/_daily-sales-management.scss';

import MoleculeDailySalesInputLabel from '../molecules/DailySalesInputLabel';
import OrganismSalesManagementItem from '../organisms/SalesManagementItem';
import { monthlySalesData } from '../../recoil';
import { DailySales, Product } from '../../recoil/type';

import { buildRowsToSales, buildYearHyphenMonthToDate } from '../../utils';

import { Row, Rows } from '../../apis/type';
import { useQueryParam } from '../../hooks/useQueryParam';
import { SPREADSHEET_ID_QUERY_NAME } from '../pages/Calendar';
import {
  fetchCreateSpreadsheet,
  fetchSetSheetValue,
} from '../../apis/spreadsheet';
import ModalNotification from '../modals/Notification';
import { useModal } from '../../hooks/useModal';

const INITIAL_STATE: DailySales = {
  date: new Date(),
  store: '',
  products: [],
  userName: '신금희',
};
function TemplateDailySalesManagement({
  currDate,
  onClickComplete = () => {},
}: Props) {
  const { isOpen, close, open, isShow, duration } = useModal();
  const [querySpreadsheetID, setQuerySpreadsheetID] = useQueryParam(
    SPREADSHEET_ID_QUERY_NAME
  );

  const [sales, setSales] = useRecoilState(monthlySalesData);
  const [currSales, setCurrSales] = useState(INITIAL_STATE);
  const [fetchIsLoaded, setFetchIsLoaded] = useState(true);
  const [notification, setNotification] = useState<ReactNode>();

  useEffect(() => {
    const includedSales = sales.find((item) => +item.date === +currDate);

    setCurrSales(
      includedSales || {
        ...INITIAL_STATE,
        date: currDate,
      }
    );
  }, [currDate, sales]);

  const onChangeInput = (
    { target: { value, name } }: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updateProducts = (products: any[]) =>
      products.map((item) => {
        if (item.id === id)
          return {
            ...item,
            [name]: value,
          };

        return item;
      });

    setCurrSales((prev) => ({
      ...prev,
      products: updateProducts(prev.products),
    }));
  };

  const onClickDelete = (id: number) => {
    const filteredProduct = currSales.products.filter((item) => item.id !== id);

    setCurrSales((prev) => ({ ...prev, products: filteredProduct }));
  };

  const onClickAdd = () => {
    const buildID = (products: Product[]) =>
      Math.max(...products.map((item) => item.id)) + 1;
    const id = currSales.products.length ? buildID(currSales.products) : 1;
    const initState = {
      id,
      name: '',
      quantity: 1,
      price: 1,
    };

    setCurrSales((prev) => ({
      ...prev,
      products: [...prev.products, initState],
    }));
  };

  const onChangeStoreName = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setCurrSales((prev) => ({ ...prev, store: value }));
  };

  const onClickSetSales = async () => {
    setSales((prev) => {
      const isIncluded =
        prev.findIndex((item) => item.date === currSales.date) !== -1;
      const monthlySales = isIncluded
        ? prev.map((item) => {
            if (item.date === currSales.date) return currSales;
            return item;
          })
        : [...prev, currSales];

      if (currSales.products.length && currSales.store) {
        handleSubmitSheet(monthlySales);

        return monthlySales;
      }

      setNotification(<>상품 또는 매장명을 확인해주세요.</>);
      open();

      setTimeout(() => {
        close();
      }, 1000);
      return prev;
    });

    onClickCopySalesToKakaoString(currSales);
  };

  const handleSubmitSheet = async (monthlySales: DailySales[]) => {
    setFetchIsLoaded(false);

    const sortedMonthlySales = _.sortBy(monthlySales, (o) =>
      new Date(o.date).getTime()
    );
    const payload = sortedMonthlySales.reduce((accu, dailySales) => {
      const productRows = buildRowsToSales(dailySales);
      const totalPrice = dailySales.products.reduce(
        (priceAccu, { price, quantity }) => priceAccu + price * quantity,
        0
      );
      const totalPriceRow: Row = [
        '',
        '',
        '',
        '',
        '',
        '',
        totalPrice.toString(),
      ];

      return [...accu, ...productRows, totalPriceRow];
    }, [] as Rows);

    const spreadsheetID =
      querySpreadsheetID ||
      (
        await fetchCreateSpreadsheet(
          `${buildYearHyphenMonthToDate(currDate)}_매출보고`
        )
      ).spreadsheetId;
    if (!querySpreadsheetID) setQuerySpreadsheetID(spreadsheetID);

    await fetchSetSheetValue(spreadsheetID, payload);
    setNotification(
      <>
        매출 복사 완료! <br />
        카톡으로 넘어가서 붙혀넣기 하면 돼요 :)
      </>
    );
    open();

    setTimeout(() => {
      setFetchIsLoaded(true);

      onClickComplete();
    }, 1500);
  };

  const onClickCopySalesToKakaoString = ({
    store,
    date,
    products,
  }: DailySales) => {
    const title = `${date.getMonth() + 1}월${date.getDate()}일 매출보고
매  장  명 : ${store}`;
    const product = products.map(
      (item, idx) => `${idx ? '■ 서브제품' : '▶️ 메인행사'} : ${item.name}
  판매수량 :  ${item.price}×${item.quantity}
  판매금액 :  ${(item.price * item.quantity).toLocaleString()}`
    );
    const footer = `총합산금액:  ${products
      .reduce((accu, curr) => accu + curr.quantity * curr.price, 0)
      .toLocaleString()}원`;

    navigator.clipboard.writeText([title, ...product, footer].join('\n\n'));
  };

  return (
    <>
      <section className="daily-sales">
        <div className="daily-sales__store-name">
          <MoleculeDailySalesInputLabel
            onChange={onChangeStoreName}
            type="text"
            value={currSales.store}
            placeholder="매장명을 입력해주세요."
            name="name"
          >
            매장명
          </MoleculeDailySalesInputLabel>
        </div>
        <ul className="daily-sales__list">
          {currSales.products.map(({ id, name, quantity, price }) => (
            <OrganismSalesManagementItem
              onChangeInput={(e) => onChangeInput(e, id)}
              onClickDelete={() => onClickDelete(id)}
              productNameValue={name}
              quantityValue={quantity}
              priceValue={price}
            />
          ))}
        </ul>

        <button className="daily-sales__add" type="button" onClick={onClickAdd}>
          <div>
            <IoAddOutline size="100%" />
          </div>
        </button>
        <button
          className="daily-sales__complete"
          type="button"
          onClick={onClickSetSales}
        >
          {fetchIsLoaded ? (
            '완료하기'
          ) : (
            <ReactLoading type="spinningBubbles" width="50px" height="50px" />
          )}
        </button>
      </section>

      <ModalNotification
        onClickClose={close}
        isShow={isShow}
        isOpen={isOpen}
        duration={duration}
      >
        {notification}
      </ModalNotification>
    </>
  );
}

export default TemplateDailySalesManagement;

export interface Props {
  currDate: Date;
  onClickComplete?: () => void;
}
