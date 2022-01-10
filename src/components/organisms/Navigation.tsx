import React, { useEffect, useRef, useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineUnorderedList,
  AiOutlineSetting,
  AiOutlineCalendar,
} from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

import './Navigation.scss';

import MoleculeNavigationItem from '../molecules/NavigationItem';

const NAVIGATION_ITEMS = [
  {
    title: '리스트',
    icon: <AiOutlineUnorderedList size="100%" />,
    link: 'list',
  },
  { title: '달력', icon: <AiOutlineCalendar size="100%" />, link: 'calendar' },
  { title: '홈', icon: <AiOutlineHome size="100%" />, link: '' },
  { title: '사용자', icon: <AiOutlineUser size="100%" />, link: 'ddddd' },
  { title: '설정', icon: <AiOutlineSetting size="100%" />, link: 'vvfefeww' },
];

function OrganismNavigation() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeItemIdx, setActiveItemIdx] = useState(2);
  const location = useLocation();

  console.log(location.pathname, 'D<DS<');
  useEffect(() => {
    ref.current!.style.left = `${activeItemIdx * 70}px`;
  }, [activeItemIdx]);

  return (
    <ul className="navigation-list">
      {NAVIGATION_ITEMS.map(({ icon, title, link }, idx) => (
        <MoleculeNavigationItem
          key={title}
          linkTo={link}
          icon={icon}
          title={title}
          isActive={location.pathname.includes(link)}
          onClick={() => {
            setActiveItemIdx(idx);
          }}
        />
      ))}
      <div className="navigation-list__indicator" ref={ref} />
    </ul>
  );
}

export default OrganismNavigation;
