import React from 'react';
import { useRecoilValue } from 'recoil';
import { AiOutlineCheck } from 'react-icons/ai';

import '../../assets/styles/components/templates/_calendar.scss';

import { monthlySalesData } from '../../recoil';
import useCalendar from '../../hooks/useCalendar';
import AtomLoadingIcon from '../atoms/LoadingIcon';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function TemplateCalendar({ onClickDate, date, isLoaded }: Props) {
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

      {
        // Todo: suspense 사용해서 상태 없이 만들기
        !isLoaded && (
          <div>
            <div>
              <AtomLoadingIcon />
            </div>
          </div>
        )
      }
    </table>
  );
}

export default TemplateCalendar;

interface Props {
  onClickDate: (date: Date) => void;
  date: Date;
  isLoaded: boolean;
}
