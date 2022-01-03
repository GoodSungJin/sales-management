import { AxiosResponse } from 'axios';

export const fetchGetFilesFilterSpread = async () => {
  try {
    const res = await window.gapi.client.drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
    });

    return res.result.files;
  } catch (e) {
    console.log(e);
  }
};
