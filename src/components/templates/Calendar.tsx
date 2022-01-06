import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AiOutlineCheck } from 'react-icons/ai';

import './Calendar.scss';
import { monthlySalesData } from '../../recoil';

const WEEK_DAYS = 7;
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function TemplateCalendar({ onClickDate, date }: Props) {
  const sales = useRecoilValue(monthlySalesData);
  const [weeksByDate, setWeeksByDate] = useState<number[][]>([[]]);

  useEffect(() => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();
    const lastDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const emptyDateForFirstDay = Array.from({ length: firstDay }, () => 0);
    const dates = Array.from({ length: lastDate }, (v, k) => k + 1);
    const emptyDateForLastDay = Array.from(
      { length: WEEK_DAYS - lastDay - 1 },
      () => 0
    );

    const weeks = [
      ...emptyDateForFirstDay,
      ...dates,
      ...emptyDateForLastDay,
    ].reduce((accu, curr, idx) => {
      if (idx % WEEK_DAYS) accu[accu.length - 1].push(curr);
      else accu.push([curr]);

      return accu;
    }, [] as number[][]);

    setWeeksByDate(weeks);
  }, [date]);

  return (
    <table>
      {[DAYS, ...weeksByDate].map((week, idx) => (
        <tr key={week.join('')}>
          {week.map((dateOfWeek) => {
            if (!idx)
              return (
                <td>
                  <th>{dateOfWeek}</th>
                </td>
              );
            return (
              <td>
                {dateOfWeek ? (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                  <div
                    onClick={() => {
                      onClickDate(new Date(`2022-01-${dateOfWeek}`));
                    }}
                  >
                    <h3>{dateOfWeek}</h3>
                    {sales.findIndex(
                      (item) => item.date === `2022-1-${dateOfWeek}`
                    ) !== -1 && <AiOutlineCheck />}
                  </div>
                ) : (
                  ''
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </table>
  );
}

export default TemplateCalendar;

interface Props {
  onClickDate: (date: Date) => void;
  date: Date;
}
