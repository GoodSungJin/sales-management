import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import './Detail.scss';

import { fetchGetSheet } from '../../api/spreadSheet';
import TemplateCalendar from '../templates/Calendar';
import PageDailySaleManagementModal from '../templates/modal/DailySaleManagementModal';
import { useModal } from '../../hooks/useModal';
import { monthlySalesData } from '../../recoil';
import { buildDailySalesByRow } from '../../utils';

function PageDetail() {
  const { id: spreadsheetID } = useParams<'id'>();

  const setSales = useSetRecoilState(monthlySalesData);

  const { isOpen, close, open, isShow, duration } = useModal();
  const [currDate, setCurrDate] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const res = await fetchGetSheet(spreadsheetID || '');

      setSales(buildDailySalesByRow(res));
    };

    init();
  }, [spreadsheetID]);

  return (
    <section className="detail-section">
      <div className="detail-section__calendar">
        <div className="detail-section__calendar__title">
          <h2 className="detail-section__calendar__title__text">12월</h2>
        </div>
        <TemplateCalendar
          onClickDate={(date) => {
            setCurrDate(
              `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            );
            open();
          }}
        />
      </div>

      <PageDailySaleManagementModal
        currDate={currDate}
        onClickClose={close}
        duration={duration}
        isOpen={isOpen}
        isShow={isShow}
      />
    </section>
  );
}

export default PageDetail;
