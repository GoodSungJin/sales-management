import React, { useEffect, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import './App.scss';
import {
  fetchCreateFile,
  fetchReadCell,
  fetchWriteCell,
} from './api/spreadSheet';

import { fetchGetFilesFilterSpread } from './api/googleDrive';
import { spreadsheetsState } from './recoil';
import { routes } from './Router';

function App() {
  const router = useRoutes(routes);

  return <div>{router}</div>;
}

export default App;
