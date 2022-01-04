import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { fetchGetFilesFilterSpread } from '../../api/googleDrive';
import OrganismSheetList from '../organisms/FileList';
import { spreadsheetsState } from '../../recoil';

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
    </div>
  );
}

export default PageList;
