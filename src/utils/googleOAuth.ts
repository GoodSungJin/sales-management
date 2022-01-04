const initClient = async (cb: InitClientCB) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // TODO: Authorize using one of the following scopes:
  const SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
  ];
  const DISCOVERY_DOCS = [
    'https://sheets.googleapis.com/$discovery/rest?version=v4',
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  ];

  const res = await window.gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    scope: SCOPES.join(' '),
    discoveryDocs: DISCOVERY_DOCS,
  });

  cb(window.gapi.auth2.getAuthInstance().isSignedIn.get());

  window.gapi.auth2.getAuthInstance().isSignedIn.listen((a: any) => {
    console.log(a, 'D<D<');
  });
  console.log(res, 'init client res');
};

export function handleClientLoad(cb: InitClientCB) {
  window.gapi.load(
    'client:auth2',
    () => initClient(cb),
    () => {
      console.log('구글 로드 에러');
    }
  );
}

type InitClientCB = (isAuthenticated: boolean) => void;
