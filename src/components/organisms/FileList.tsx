import React from 'react';
import './FileList.scss';

import { useRecoilValue } from 'recoil';

import MoleculeListItem from '../molecules/FileListItem';
import { spreadsheetsState } from '../../recoil';

function OrganismFileList() {
  const spreadsheets = useRecoilValue(spreadsheetsState);

  return (
    <ul className="sheet-list">
      {spreadsheets.map((sheet: any) => (
        <div className="sheet-list__item" key={sheet.id}>
          <MoleculeListItem linkTo={`/detail/${sheet.id}`}>
            {sheet.name}
          </MoleculeListItem>
        </div>
      ))}
    </ul>
  );
}

export default OrganismFileList;
