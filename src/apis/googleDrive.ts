export const fetchGetSpreadsheet = async () => {
  try {
    const res = await window.gapi.client.drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
    });

    return res.result.files;
  } catch (e) {
    console.log(e, 'fetchGetSpreadsheet');
  }
};
