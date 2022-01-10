import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import './App.scss';

import { routes } from './Router';
import TemplateGlobalNavigationBar from './components/templates/GlobalNavigationBar';
import { handleClientLoad } from './apis/googleClient';

function App() {
  const router = useRoutes(routes);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    handleClientLoad((isAuth) => {
      setIsAuthenticated(isAuth);
    });
  }, []);

  function handleSignInClick(event: any) {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  return (
    <>
      {isAuthenticated ? (
        router
      ) : (
        <button type="button" onClick={handleSignInClick}>
          sign in
        </button>
      )}

      <TemplateGlobalNavigationBar />
    </>
  );
}

export default App;