import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://sheets.googleapis.com/v4/spreadsheets',
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});
