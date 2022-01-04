import React, { ReactNode } from 'react';
import './FileListItem.scss';
import { Link } from 'react-router-dom';

function MoleculeFileListItem({ children, linkTo }: Props) {
  return (
    <li className="list-item">
      <Link className="list-item__link" to={linkTo}>
        <p className="list-item__link__text">{children}</p>
      </Link>
    </li>
  );
}

export default MoleculeFileListItem;

interface Props {
  children: ReactNode;
  linkTo: string;
}
