import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

import '../../assets/styles/components/pages/_calendar.scss';

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
import ModalDailySaleManagement from '../modals/DailySalesManagement';

export const SPREADSHEET_ID_QUERY_NAME = 'spreadsheetID';

function PageCalendar() {
  const [, setQuerySpreadsheetID] = useQueryParam(SPREADSHEET_ID_QUERY_NAME);
  const navigate = useNavigate();
  const setSales = useSetRecoilState(monthlySalesData);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currDate, setCurrDate] = useState<Date>(new Date());
  const { isOpen, close, open, isShow, duration } = useModal();

  const handleGetSheetValue = async (id: string = '') => {
    const { values } = await fetchGetSheetValue(id);

    setSales(buildDailySalesToRow(values));
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
      }
    };

    init();
    // eslint-disable-next-line
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
        <ModalDailySaleManagement
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
