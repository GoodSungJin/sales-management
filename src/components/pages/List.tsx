import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { IoAddOutline } from 'react-icons/io5';

import './List.scss';

import { fetchGetSpreadsheet } from '../../apis/googleDrive';
import OrganismSheetList from '../organisms/FileList';
import { spreadsheetsState } from '../../recoil';
import { fetchCreateSpreadsheet } from '../../apis/spreadsheet';
import TemplateModalCreateSheet from '../templates/modal/CreateSheetModal';
import { useModal } from '../../hooks/useModal';

function PageList() {
  const setSpreadsheets = useSetRecoilState(spreadsheetsState);

  const { isOpen, close, open, isShow, duration } = useModal();

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    const res = await fetchGetSpreadsheet();

    setSpreadsheets(res);
  };

  return (
    <div className="list">
      <OrganismSheetList />

      <button
        type="button"
        className="list__create"
        onClick={() => {
          open();
        }}
      >
        <IoAddOutline size="100%" />
      </button>

      <TemplateModalCreateSheet
        onClickClose={close}
        isShow={isShow}
        isOpen={isOpen}
        duration={duration}
        onSubmit={async (e, { year, month }) => {
          await fetchCreateSpreadsheet(`${year}-${month}_매출보고`);

          close();

          getFiles();
        }}
      />
    </div>
  );
}

export default PageList;
