import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import '../../assets/styles/components/organisms/_navigation.scss';

import { useLocation } from 'react-router-dom';

import MoleculeNavigationItem from '../molecules/NavigationItem';
import { RouteName } from '../../Router';

function OrganismNavigation({ navigations }: Props) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const location = useLocation();

  useEffect(() => {
    // @ts-ignore
    const currItem = [...listRef.current.children].find(
      (item) => location.pathname === item.dataset.path
    );

    indicatorRef.current!.style.left = `${currItem.offsetLeft}px`;
  }, [location]);

  return (
    <ul className="navigation-list" ref={listRef}>
      {navigations.map(({ icon, name, path }, idx) => (
        <div data-path={path}>
          <MoleculeNavigationItem
            key={name}
            linkTo={path}
            icon={icon}
            title={name}
            isActive={location.pathname === path}
          />
        </div>
      ))}
      <div className="navigation-list__indicator" ref={indicatorRef} />
    </ul>
  );
}

export default OrganismNavigation;

interface NavigationItem {
  name: RouteName;
  icon: ReactNode;
  path: string;
}
interface Props {
  navigations: NavigationItem[];
}
