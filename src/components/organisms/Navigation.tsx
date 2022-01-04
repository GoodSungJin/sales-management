import React, { useEffect, useRef, useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineUnorderedList,
  AiOutlineSetting,
  AiOutlineMessage,
} from 'react-icons/ai';

import './Navigation.scss';

import MoleculeNavigationItem from '../molecules/NavigationItem';

function OrganismNavigation() {
  const NAVIGATION_ITEMS = [
    {
      title: '리스트',
      icon: <AiOutlineUnorderedList size="100%" />,
      link: 'list',
    },
    { title: '문자', icon: <AiOutlineMessage size="100%" />, link: '' },
    { title: '홈', icon: <AiOutlineHome size="100%" />, link: '' },
    { title: '사용자', icon: <AiOutlineUser size="100%" />, link: '' },
    { title: '설정', icon: <AiOutlineSetting size="100%" />, link: '' },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const [activeItemIdx, setActiveItemIdx] = useState(2);

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
          isActive={idx === activeItemIdx}
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
