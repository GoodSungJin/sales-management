import React from 'react';
import type { RouteObject } from 'react-router-dom';

import PageDetail from './components/pages/Detail';
import PageHome from './components/pages/Home';
import PageList from './components/pages/List';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PageHome />,
  },
  {
    path: '/list',
    element: <PageList />,
  },
  {
    path: '/detail/:id',
    element: <PageDetail />,
  },
];
