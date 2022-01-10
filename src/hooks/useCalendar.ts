import { useEffect, useState } from 'react';

const WEEK_DAYS = 7;
export default function useCalendar(date: Date) {
  const [weeks, setWeeks] = useState<Month>([[]]);

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

    const emptyDateForFirstDay = Array.from({ length: firstDay }, () => null);
    const dates = Array.from(
      { length: lastDate },
      (v, k) => new Date(date.getFullYear(), date.getMonth(), k + 1)
    );
    const emptyDateForLastDay = Array.from(
      { length: WEEK_DAYS - lastDay - 1 },
      () => null
    );

    const buildMonthByDates: (data: Week) => Month = (data) =>
      data.reduce((accu, curr, idx) => {
        if (idx % WEEK_DAYS) accu[accu.length - 1].push(curr);
        else accu.push([curr]);

        return accu;
      }, [] as Month);

    setWeeks(
      buildMonthByDates([
        ...emptyDateForFirstDay,
        ...dates,
        ...emptyDateForLastDay,
      ])
    );
  }, [date]);

  return weeks;
}

type DateType = Date | null;
type Week = DateType[];
type Month = Week[];
