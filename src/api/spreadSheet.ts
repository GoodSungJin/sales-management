import { Row } from '../utils';

function createFolder(name: string) {
  const fileMetadata = {
    mimeType: 'application/vnd.google-apps.folder',
  };
  const requestBody = {
    name: '테스트',

    q: "mimeType='application/vnd.google-apps.folder' and name = '테스트'",
  };

  window.gapi.client.drive.files
    .create({
      resource: fileMetadata,
      fields: 'id',
    })
    .then((resp: any) => {
      console.log('Folder Id: ', resp.id);
    });
}

export const fetchCreateFile = async (title: string) => {
  const res = await window.gapi.client.sheets.spreadsheets.create({
    properties: {
      title,
    },
    // developerMetadata: [
    //   {
    //     location: {
    //       spreadsheet: true,
    //       locationType: 'SPREADSHEET',
    //     },
    //     metadataKey: 'questionId',
    //     metadataValue: '12345',
    //     visibility: 'DOCUMENT',
    //     metadataId: 12345,
    //   },
    // ],
  });

  console.log(res, 'Create File');
};

export const fetchGetSheet = async (
  spreadsheetId: string,
  range: string = '시트1'
) => {
  const filterHeader = (rows: Row[]): Row[] => {
    const copy = [...rows];
    copy.shift();

    return copy;
  };
  const res = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return filterHeader(res.result?.values || []);
};

export const fetchSetSheet = async (
  spreadsheetID: string,
  values: string[][]
) => {
  const columnTitle = [
    'MD',
    '매장명',
    '날짜',
    '제품명',
    '판매수량',
    '금액',
    '합계',
  ];
  const body = {
    values: [columnTitle, ...values],
  };
  const res = await window.gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: spreadsheetID,
    range: 'A1:G150',
    valueInputOption: 'RAW',
    resource: body,
  });

  //   .then((response) => {
  //   var result = response.result;
  //   console.log(`${result.updatedCells} cells updated.`);
  // });
};

const getFolderIdByName = () => {
  const fileMetadata = {
    name: '테스트',
    mimeType: 'application/vnd.google-apps.folder',
  };

  window.gapi.client.drive.files
    .list({
      q: "mimeType='application/vnd.google-apps.folder' and name = '테스트'",
    })
    .then((response: any) => {
      const folderID = response.result.files[0].id;
      window.gapi.client.drive.files
        .list({
          q: "mimeType='application/vnd.google-apps.folder' and name = '테스트'",
        })
        .then((res: any) => {
          console.log(res);
        });
    });
};
