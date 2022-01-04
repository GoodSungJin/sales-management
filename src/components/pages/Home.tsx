import React from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import { fetchCreateFile } from '../../api/spreadSheet';
import TemplateDailySalesManagement from '../templates/DailySalesManagement';

function PageHome() {
  const navigate = useNavigate();
  function handleSignInClick(event: any) {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignOutClick(event: any) {
    window.gapi.auth2.getAuthInstance().signOut();
  }
  return (
    <>
      <TemplateDailySalesManagement />
      <div>
        <button type="button" onClick={handleSignInClick}>
          sign in
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
    </>
  );
}

export default PageHome;
