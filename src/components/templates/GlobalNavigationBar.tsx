import React from 'react';

import './GlobalNavigationBar.scss';

import OrganismNavigation from '../organisms/Navigation';

function TemplateGlobalNavigationBar() {
  return (
    <nav className="navigation">
      <OrganismNavigation />
    </nav>
  );
}

export default TemplateGlobalNavigationBar;
