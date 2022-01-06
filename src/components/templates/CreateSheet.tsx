import React, { FormEvent, useMemo, useState } from 'react';

import './CreateSheet.scss';

function TemplateCreateSheet({ onSubmit }: Props) {
  const date = useMemo(() => new Date(), []);
  const [dateInfo, setDateInfo] = useState({
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });

  const monthOptionsEl = useMemo(
    () =>
      Array.from({ length: 12 }, (v, k) => k + 1).map((month) => (
        <option
          className="create-sheet__fieldset__input-group__select__option"
          value={month}
          defaultValue={date.getMonth() + 1}
        >
          {month}
        </option>
      )),
    []
  );

  const yearOptionsEl = useMemo(
    () =>
      Array.from({ length: 2 }, (v, k) => date.getFullYear() - k).map(
        (year) => (
          <option
            className="create-sheet__fieldset__input-group__select__option"
            value={year}
            defaultValue={date.getFullYear()}
          >
            {year}
          </option>
        )
      ),
    []
  );

  return (
    <form
      className="create-sheet"
      onSubmit={async (e) => {
        e.preventDefault();

        onSubmit(e, dateInfo);
      }}
    >
      <fieldset className="create-sheet__fieldset">
        <legend className="create-sheet__fieldset__legend">파일 생성</legend>
        <div className="create-sheet__fieldset__input-group">
          <select
            name="year"
            className="create-sheet__fieldset__input-group__select"
            onChange={({ target: { value } }) =>
              setDateInfo((prev) => ({ ...prev, year: +value }))
            }
          >
            {yearOptionsEl}
          </select>
          <select
            name="month"
            onChange={({ target: { value } }) =>
              setDateInfo((prev) => ({ ...prev, month: +value }))
            }
          >
            {monthOptionsEl}
          </select>
        </div>
        <input type="submit" value="이번 달 시작하기" />
      </fieldset>
    </form>
  );
}

export default TemplateCreateSheet;

interface DateInfo {
  year: number;
  month: number;
}
type FnOnSubmit = (e: FormEvent<HTMLFormElement>, dateInfo: DateInfo) => void;

export interface Props {
  onSubmit: FnOnSubmit;
}
