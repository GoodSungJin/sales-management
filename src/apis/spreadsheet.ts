import { FnFetchGetSheetValue, Rows } from './type';

export const fetchCreateSpreadsheet = async (title: string) => {
  try {
    const res = await window.gapi.client.sheets.spreadsheets.create({
      properties: {
        title,
      },
    });

    return res.result;
  } catch (e) {
    // eslint-disable-next-line
    console.log(e, 'fetchCreateSpreadsheet');
  }
};

export const fetchGetSheetValue: FnFetchGetSheetValue = async (
  spreadsheetId: string,
  range: string = '시트1'
) => {
  const filterHeader = (rows: Rows) => {
    const copy = [...rows];
    copy.shift();

    return copy;
  };

  try {
    const valueRes = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const spreadsheetRes = await fetchGetSpreadsheet(spreadsheetId);

    return {
      title: spreadsheetRes.properties.title,
      values: filterHeader(valueRes.result?.values || []),
    };
  } catch (e) {
    // eslint-disable-next-line
    console.log(e, 'fetchGetSheetValue');

    return {
      title: '',
      values: [],
    };
  }
};

const fetchGetSpreadsheet = async (spreadsheetId: string) => {
  try {
    const res = await window.gapi.client.sheets.spreadsheets.get({
      spreadsheetId,
    });

    return res.result;
  } catch (e) {
    // eslint-disable-next-line
    console.log(e, 'fetchGetSpreadsheet');
  }
};

export const fetchSetSheetValue = async (
  spreadsheetID: string,
  values: string[][]
) => {
  const TITLES = ['MD', '매장명', '날짜', '제품명', '판매수량', '금액', '합계'];
  const resource = {
    values: [TITLES, ...values],
  };

  try {
    return await window.gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetID,
      range: 'A1:G150',
      valueInputOption: 'RAW',
      resource,
    });
  } catch (e) {
    // eslint-disable-next-line
    console.log(e, 'fetchSetSheetValue');
  }
};

// const getFolderIdByName = () => {
//   const fileMetadata = {
//     name: '테스트',
//     mimeType: 'application/vnd.google-apps.folder',
//   };
//
//   window.gapi.client.drive.files
//     .list({
//       q: "mimeType='application/vnd.google-apps.folder' and name = '테스트'",
//     })
//     .then((response: any) => {
//       const folderID = response.result.files[0].id;
//       window.gapi.client.drive.files
//         .list({
//           q: "mimeType='application/vnd.google-apps.folder' and name = '테스트'",
//         })
//         .then((res: any) => {
//           console.log(res);
//         });
//     });
// };

// function createFolder(name: string) {
//   const fileMetadata = {
//     mimeType: 'application/vnd.google-apps.folder',
//   };
//   const requestBody = {
//     name: '테스트',
//
//     q: "mimeType='application/vnd.google-apps.folder' and name = '테스트'",
//   };
//
//   window.gapi.client.drive.files
//     .create({
//       resource: fileMetadata,
//       fields: 'id',
//     })
//     .then((resp: any) => {
//       console.log('Folder Id: ', resp.id);
//     });
// }
