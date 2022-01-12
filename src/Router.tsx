import React from 'react';
import type { RouteObject } from 'react-router-dom';

import PageHome from './components/pages/Home';
import PageCalendar from './components/pages/Calendar';
import PageSetting from './components/pages/Setting';

export const routes: Route[] = [
  {
    name: 'home',
    path: '/',
    element: <PageHome />,
  },
  {
    name: 'calendar',
    path: '/calendar',
    element: <PageCalendar />,
  },
  {
    name: 'setting',
    path: '/setting',
    element: <PageSetting />,
  },
];

export type RouteName = 'home' | 'calendar' | 'setting';
interface Route extends RouteObject {
  name: RouteName;
}

export const getRoutePathByName = (name: RouteName) =>
  routes.find((route) => route.name === name)?.path || '';
