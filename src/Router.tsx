import React from 'react';
import type { RouteObject } from 'react-router-dom';

import PageHome from './components/pages/Home';
import PageList from './components/pages/List';
import PageCalendar from './components/pages/Calendar';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PageHome />,
  },
  {
    path: '/calendar',
    element: <PageCalendar />,
  },
  {
    path: '/list',
    element: <PageList />,
  },
  {
    path: '/detail/:id',
    element: <PageCalendar />,
  },
];
