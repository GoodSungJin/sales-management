import React, { ReactNode, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';

import { useRecoilValue } from 'recoil';
import _ from 'lodash';
import ReactLoading from 'react-loading';
import { useFieldArray, useForm } from 'react-hook-form';

import '../../assets/styles/components/templates/_daily-sales-management.scss';

import MoleculeDailySalesInputLabel from '../molecules/DailySalesInputLabel';
import OrganismSalesManagementItem from '../organisms/SalesManagementItem';
import { monthlySalesData } from '../../recoil';
import { DailySales, Product } from '../../recoil/type';

import {
  buildSalesToKakaoString,
  buildYearHyphenMonthToDate,
} from '../../utils';

import { Row, Rows } from '../../apis/type';
import { useQueryParam } from '../../hooks/useQueryParam';
import { SPREADSHEET_ID_QUERY_NAME } from '../pages/Calendar';
import {
  fetchCreateSpreadsheet,
  fetchSetSheetValue,
} from '../../apis/spreadsheet';
import ModalNotification from '../modals/Notification';
import { useModal } from '../../hooks/useModal';
import { buildRowsToSales } from '../../utils/product';

function TemplateDailySalesManagement({
  currDate,
  onClickComplete = () => {},
}: Props) {
  const sales = useRecoilValue(monthlySalesData);
  const [fetchIsLoaded, setFetchIsLoaded] = useState(true);
  const [message, setMessage] = useState<ReactNode>();

  const { isOpen, close, open, isShow, duration } = useModal();
  const [querySpreadsheetID, setQuerySpreadsheetID] = useQueryParam(
    SPREADSHEET_ID_QUERY_NAME
  );
  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<DailySales>({
    defaultValues: {
      date: new Date(),
      store: '',
      products: [],
      userName: '신금희',
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  useEffect(() => {
    const includedSales = sales.find((item) => +item.date === +currDate);

    setValue('store', includedSales?.store || '');
    setValue('products', includedSales?.products || []);
  }, [currDate, sales, setValue]);

  const onClickAddProduct = () =>
    append({
      name: '',
      quantity: 0,
      price: 0,
    });
  const onClickDeleteProduct = (id: number) => remove(id);
  const onSubmit = async (data: DailySales) => {
    if (!data.products.length)
      return setError('store', {
        message: '상품을 등록해주세요.',
      });
    const isIncluded =
      sales.findIndex((item) => item.date === data.date) !== -1;

    setFetchIsLoaded(false);

    await fetchSetSheetValue(
      await getSpreadsheetID(),
      buildSpreadsheetValue(
        isIncluded ? _.concat(sales, data) : [...sales, data]
      )
    );

    copyText(buildSalesToKakaoString(data));

    setTimeout(() => {
      setFetchIsLoaded(true);

      onClickComplete();
    }, 1500);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);

    setMessage(
      <>
        매출 복사 완료! <br />
        카톡으로 넘어가서 붙혀넣기 하면 돼요 :)
      </>
    );

    open();
  };

  const getSpreadsheetID = async () => {
    if (!querySpreadsheetID) {
      const { spreadsheetId } = await fetchCreateSpreadsheet(
        `${buildYearHyphenMonthToDate(currDate)}_매출보고`
      );

      setQuerySpreadsheetID(spreadsheetId);
      return spreadsheetId;
    }

    return querySpreadsheetID;
  };

  const buildSpreadsheetValue = (monthlySales: DailySales[]) => {
    const sortedSales = _.sortBy(monthlySales, (o) =>
      new Date(o.date).getTime()
    );

    return sortedSales.reduce((accu, dailySales) => {
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
        totalPrice.toLocaleString(),
      ];

      return [...accu, ...productRows, totalPriceRow];
    }, [] as Rows);
  };

  useEffect(() => {
    // Todo: errors 재귀로 배열 하나로 만들던지, 에러 컴포넌트 따로 뺄지 고민
    if (!Object.keys(errors).length) return;

    setMessage(() => {
      if (errors.store) return errors.store.message;

      if (errors.products) {
        const key = Object.keys(errors.products[0])[0] as keyof Product;

        return errors.products[0][`${key}`]!.message;
      }
    });

    open();

    setTimeout(() => {
      close();
      clearErrors();
    }, 1500);
  }, [Object.keys(errors).join('')]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <form
        onKeyDown={(e) => e.code === 'Enter' && e.preventDefault()}
        onSubmit={handleSubmit(onSubmit)}
        className="daily-sales"
      >
        <div className="daily-sales__close">
          <button type="button" onClick={onClickComplete}>
            <IoMdClose size="100%" />
          </button>
        </div>
        <div className="daily-sales__store-name">
          <MoleculeDailySalesInputLabel
            register={register('store', { required: '매장명을 입력해주세요.' })}
            type="text"
            placeholder="매장명을 입력해주세요."
          >
            매장명
          </MoleculeDailySalesInputLabel>
        </div>

        <ul className="daily-sales__list">
          {fields.map((field, idx) => (
            <OrganismSalesManagementItem
              key={field.id}
              onClickDelete={() => onClickDeleteProduct(field.itemID)}
              nameRegister={register(`products.${idx}.name`, {
                required: '제품명을 입력해주세요.',
              })}
              priceRegister={register(`products.${idx}.price`, {
                required: '가격을 입력해주세요.',
              })}
              quantityRegister={register(`products.${idx}.quantity`, {
                required: '수량을 입력해주세요.',
              })}
            />
          ))}
        </ul>

        <button
          className="daily-sales__add"
          type="button"
          onClick={onClickAddProduct}
        >
          <div>
            <IoAddOutline size="100%" />
          </div>
        </button>
        <button className="daily-sales__complete" type="submit">
          {fetchIsLoaded ? (
            '완료하기'
          ) : (
            <ReactLoading type="spinningBubbles" width="50px" height="50px" />
          )}
        </button>
      </form>

      <ModalNotification
        onClickClose={close}
        isShow={isShow}
        isOpen={isOpen}
        duration={duration}
      >
        {message}
      </ModalNotification>
    </>
  );
}

export default TemplateDailySalesManagement;

export interface Props {
  currDate: Date;
  onClickComplete?: () => void;
}
