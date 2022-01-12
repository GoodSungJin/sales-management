import React from 'react';
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineCalendar,
} from 'react-icons/ai';

import '../../assets/styles/components/templates/_global-navigation-bar.scss';

import OrganismNavigation from '../organisms/Navigation';
import { getRoutePathByName } from '../../Router';

function TemplateGlobalNavigationBar() {
  return (
    <nav className="navigation">
      <OrganismNavigation
        navigations={[
          {
            name: 'calendar',
            path: getRoutePathByName('calendar'),
            icon: <AiOutlineCalendar size="100%" />,
          },
          {
            name: 'home',
            path: getRoutePathByName('home'),
            icon: <AiOutlineHome size="100%" />,
          },
          {
            name: 'setting',
            path: getRoutePathByName('setting'),
            icon: <AiOutlineSetting size="100%" />,
          },
        ]}
      />
    </nav>
  );
}

export default TemplateGlobalNavigationBar;
