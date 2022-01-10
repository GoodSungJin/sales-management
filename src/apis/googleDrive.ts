import { File } from './type';

export const fetchGetSpreadsheet: () => Promise<File[]> = async () => {
  try {
    const res = await window.gapi.client.drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
    });

    return res.result.files;
  } catch (e) {
    console.log(e, 'fetchGetSpreadsheet');
  }
};
