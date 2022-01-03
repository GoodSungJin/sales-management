export interface SpreadSheetBody {
  spreadsheetId: string;
  properties: {
    title: string;
    locale: string;
    // "autoRecalc": enum (RecalculationInterval),
    timeZone: string;
    // "defaultFormat": {
    //   object (CellFormat)
    // },
    // "iterativeCalculationSettings": {
    //   object (IterativeCalculationSettings)
    // },
    // "spreadsheetTheme": {
    //   object (SpreadsheetTheme)
    // }
  };
  // "sheets": [
  //   {
  //     object (Sheet)
  //   }
  // ],
  // "namedRanges": [
  //   {
  //     object (NamedRange)
  //   }
  // ],
  // "spreadsheetUrl": string,
  // "developerMetadata": [
  //   {
  //     object (DeveloperMetadata)
  //   }
  // ],
  // "dataSources": [
  //   {
  //     object (DataSource)
  //   }
  // ],
  // "dataSourceSchedules": [
  //   {
  //     object (DataSourceRefreshSchedule)
  //   }
  // ]
}
