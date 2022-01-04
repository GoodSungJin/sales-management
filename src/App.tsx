import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import './App.scss';

import { routes } from './Router';
import { handleClientLoad } from './utils/googleOAuth';
import TemplateGlobalNavigationBar from './components/templates/GlobalNavigationBar';

function App() {
  const router = useRoutes(routes);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    handleClientLoad((isAuth) => {
      setIsAuthenticated(isAuth);
    });
  }, []);

  return (
    <>
      {isAuthenticated ? router : 'loaded'}

      <TemplateGlobalNavigationBar />
    </>
  );
}

export default App;
