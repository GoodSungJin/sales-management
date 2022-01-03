import React from 'react';
import type { RouteObject } from 'react-router-dom';

import PageDetail from './components/pages/Detail';
import PageHome from './components/pages/Home';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PageHome />,
  },
  {
    path: '/detail/:id',
    element: <PageDetail />,
  },
];
