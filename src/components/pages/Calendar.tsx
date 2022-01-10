import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

import './Calendar.scss';

import { useQueryParam } from '../../hooks/useQueryParam';
import { useModal } from '../../hooks/useModal';

import { fetchGetSheetValue } from '../../apis/spreadsheet';
import { fetchGetSpreadsheet } from '../../apis/googleDrive';
import { monthlySalesData } from '../../recoil';
import {
  buildDailySalesToRow,
  buildDateToSheetTitle,
  buildYearHyphenMonthToDate,
} from '../../utils';

import TemplateCalendar from '../templates/Calendar';
import PageDailySaleManagementModal from '../templates/modal/DailySaleManagementModal';

export const SPREADSHEET_ID_QUERY_NAME = 'spreadsheetID';

function PageCalendar() {
  const [_, setQuerySpreadsheetID] = useQueryParam(SPREADSHEET_ID_QUERY_NAME);
  const navigate = useNavigate();
  const setSales = useSetRecoilState(monthlySalesData);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currDate, setCurrDate] = useState<Date>(new Date());
  const { isOpen, close, open, isShow, duration } = useModal();

  const handleGetSheetValue = async (id: string = '') => {
    const { values, title } = await fetchGetSheetValue(id);

    setSales(buildDailySalesToRow(values));
    // getSheetTitleToDate(title);
  };

  const onClickDecreaseMonth = () =>
    setCurrDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  const onClickIncreaseMonth = () =>
    setCurrDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));

  useEffect(() => {
    const init = async () => {
      const files = await fetchGetSpreadsheet();
      const spreadsheet = files.find((item) => {
        const fileDate = buildDateToSheetTitle(item.name);

        return (
          buildYearHyphenMonthToDate(fileDate) ===
          buildYearHyphenMonthToDate(currDate)
        );
      });

      if (spreadsheet) {
        setQuerySpreadsheetID(spreadsheet.id);

        await handleGetSheetValue(spreadsheet.id);
      } else {
        navigate('/calendar', { replace: true });

        /*

        1. 해당 날짜의 파일이 있는지 확인한다.
          - 있다면, 해당 파일 아이디를 쿼리에 셋하고 시트값을 불러온다.
          - 없다면, 파일 생성?? 일단 보류??
        2. 날짜가 변할 때마다 1번을 실행한다.


        */
        // const res = await fetchCreateSpreadsheet(
        //   `${currDate.getFullYear()}-${currDate.getMonth() + 1}_매출보고`
        // );
        // console.log(res, 'SD<D<D<D<');
      }
    };

    init();
  }, [currDate]);

  return (
    <section className="detail-section">
      <div className="detail-section__calendar">
        <div className="detail-section__calendar__title">
          <button
            className="detail-section__calendar__title__arrow-icon"
            type="button"
            onClick={onClickDecreaseMonth}
          >
            <AiOutlineLeft size="100%" />
          </button>
          <h2 className="detail-section__calendar__title__text">
            {currDate.getFullYear()}년 {currDate.getMonth() + 1}월
          </h2>
          <button
            className="detail-section__calendar__title__arrow-icon"
            type="button"
            onClick={onClickIncreaseMonth}
          >
            <AiOutlineRight size="100%" />
          </button>
        </div>

        <TemplateCalendar
          date={currDate}
          onClickDate={(date) => {
            setSelectedDate(date);

            open();
          }}
        />
      </div>

      {selectedDate && (
        <PageDailySaleManagementModal
          currDate={selectedDate}
          onClickClose={close}
          duration={duration}
          isOpen={isOpen}
          isShow={isShow}
        />
      )}
    </section>
  );
}

export default PageCalendar;
