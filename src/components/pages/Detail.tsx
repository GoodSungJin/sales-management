import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import './Detail.scss';

import { fetchGetSheetValue } from '../../apis/spreadsheet';
import TemplateCalendar from '../templates/Calendar';
import PageDailySaleManagementModal from '../templates/modal/DailySaleManagementModal';
import { useModal } from '../../hooks/useModal';
import { monthlySalesData } from '../../recoil';
import { buildDailySalesByRow } from '../../utils';

function PageDetail() {
  const { id: spreadsheetID } = useParams<'id'>();

  const setSales = useSetRecoilState(monthlySalesData);

  const { isOpen, close, open, isShow, duration } = useModal();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currDate, setCurrDate] = useState<Date>(new Date());

  useEffect(() => {
    const init = async () => {
      const { values, title } = await fetchGetSheetValue(spreadsheetID || '');

      setSales(buildDailySalesByRow(values));
      buildDateBySpreadsheetTitle(title);
    };

    init();
  }, [spreadsheetID]);

  const buildDateBySpreadsheetTitle = (title: string) => {
    const [date] = title.split('_');
    const newDate = new Date(date);

    setCurrDate(newDate);
  };

  return (
    <section className="detail-section">
      <div className="detail-section__calendar">
        <div className="detail-section__calendar__title">
          <h2 className="detail-section__calendar__title__text">
            {currDate.getFullYear()}년 {currDate.getMonth() + 1}월
          </h2>
        </div>
        <TemplateCalendar
          date={currDate}
          onClickDate={(date) => {
            setSelectedDate(
              `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            );
            open();
          }}
        />
      </div>

      <PageDailySaleManagementModal
        currDate={selectedDate}
        onClickClose={close}
        duration={duration}
        isOpen={isOpen}
        isShow={isShow}
      />
    </section>
  );
}

export default PageDetail;
