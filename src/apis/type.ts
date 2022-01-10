export type Row = string[];
export type Rows = Row[];

export type FnFetchGetSheetValue = (
  spreadsheetId: string,
  range?: string
) => Promise<{
  title: string;
  values: Rows;
}>;
export type InitClientCB = (isAuthenticated: boolean) => void;

export interface File {
  kind: string;
  id: string;
  name: string;
  mimeType: string;
}
