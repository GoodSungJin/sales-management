import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import './List.scss';

import { fetchGetFilesFilterSpread } from '../../api/googleDrive';
import OrganismSheetList from '../organisms/FileList';
import { spreadsheetsState } from '../../recoil';
import { fetchCreateFile } from '../../api/spreadSheet';

function PageList() {
  const setSpreadsheets = useSetRecoilState(spreadsheetsState);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const res = await fetchGetFilesFilterSpread();

    setSpreadsheets(res);
  };

  return (
    <div>
      <OrganismSheetList />

      <button
        type="button"
        className="list__create"
        onClick={() => {
          fetchCreateFile('1월');
        }}
      >
        생성
      </button>
    </div>
  );
}

export default PageList;
