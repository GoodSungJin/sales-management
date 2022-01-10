import React from 'react';
import { useRecoilValue } from 'recoil';
import { AiOutlineCheck } from 'react-icons/ai';

import './Calendar.scss';
import { monthlySalesData } from '../../recoil';
import useCalendar from '../../hooks/useCalendar';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function TemplateCalendar({ onClickDate, date }: Props) {
  const sales = useRecoilValue(monthlySalesData);
  const month = useCalendar(date);

  const getIncludedDate = (value: Date) =>
    sales.findIndex((item) => +item.date === +value) !== -1;

  return (
    <table>
      <thead>
        <tr>
          {DAYS.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {month.map((weeks) => (
          <tr key={weeks.join()}>
            {weeks.map((dateOfWeek) => (
              <td key={dateOfWeek && +dateOfWeek}>
                {!!dateOfWeek && (
                  <button
                    type="button"
                    onClick={() => {
                      onClickDate(dateOfWeek);
                    }}
                  >
                    <h3>{dateOfWeek.getDate()}</h3>
                    {getIncludedDate(dateOfWeek) && <AiOutlineCheck />}
                  </button>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TemplateCalendar;

interface Props {
  onClickDate: (date: Date) => void;
  date: Date;
}
