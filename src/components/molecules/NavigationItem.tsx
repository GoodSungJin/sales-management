import React, { ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/styles/components/molecules/_navigation-item.scss';

function MoleculeNavigationItem({
  isActive,
  linkTo,
  onClick,
  icon,
  title,
}: Props) {
  return (
    <li className="navigation-item">
      <Link
        className={`navigation-item__link ${isActive && 'active'}`}
        to={linkTo}
        onClick={onClick}
      >
        <h2 className="navigation-item__link__text">{title}</h2>
        <div className="navigation-item__link__icon">{icon}</div>
      </Link>
    </li>
  );
}

export default MoleculeNavigationItem;

interface Props {
  isActive: boolean;
  linkTo: string;
  title: string;
  icon: ReactNode;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}
