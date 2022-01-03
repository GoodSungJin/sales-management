import React from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { fetchGetFilesFilterSpread } from '../../api/googleDrive';
import { fetchCreateFile } from '../../api/spreadSheet';
import { spreadsheetsState } from '../../recoil';

function PageHome() {
  const test = 123;
  const [spreadsheets, setSpreadsheets] = useRecoilState(spreadsheetsState);
  const navigate = useNavigate();
  function handleSignInClick(event: any) {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignOutClick(event: any) {
    window.gapi.auth2.getAuthInstance().signOut();
  }
  return (
    <div>
      <div>
        <button type="button" onClick={handleSignInClick}>
          sign in
        </button>
        <button
          type="button"
          onClick={async () => {
            const res = await fetchGetFilesFilterSpread();

            setSpreadsheets(res);
          }}
        >
          get files
        </button>
        <button type="button" onClick={() => fetchCreateFile('테스트')}>
          create spreadsheet
        </button>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          // const res = await fetchWriteCell(
          //   currSpreadsheetID,
          //   '이거 들어가냐??'
          // );

          // console.log(res, 'D<D<D<D<');
        }}
      >
        <fieldset>
          <legend>물건</legend>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            제품명
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </fieldset>

        <input type="text" />
      </form>

      <ul>
        {spreadsheets.map((sheet: any) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            onClick={async () => {
              navigate(`/detail/${sheet.id}`);
            }}
          >
            <h1>Name: {sheet.name}</h1>
            <p>ID: {sheet.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PageHome;
