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
  });

  console.log(res, 'Create File');
};

export const fetchReadCell = async (
  spreadsheetId: string,
  range: string = '시트1'
) => {
  const res = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return res.result;
};

export const fetchWriteCell = async (spreadsheetID: string, title: string) => {
  // const values = [
  //   ['예린', '성진', '금희'],
  //   ['냠', '메롱', '규돈'],
  //   ['퉤', '오홋', '와우'],
  //   // Additional rows ...
  // ];

  const values = [
    [
      '신금희',
      '새암유통',
      '12월 02일',
      '비비고왕교자',
      '18',
      '7400',
      '133,200',
    ],
    ['신금희', '새암유통', '12월 02일', '고메피자', '11', '4980', '54,780'],
    [
      '신금희',
      '새암유통',
      '12월 02일',
      '비비고수제만두외',
      '13',
      '7900',
      '102,700',
    ],
    ['', '', '', '', '', '', '290,680'],
  ];
  const body = {
    values,
  };
  const res = await window.gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: spreadsheetID,
    range: 'A2:G5',
    valueInputOption: 'RAW',
    resource: body,
  });

  console.log(res, '<<><><><>');

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
