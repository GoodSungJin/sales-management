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

      window.gapi.auth2.getAuthInstance().isSignedIn.listen((res: boolean) => {
        setIsAuthenticated(res);
      });
    });
  }, []);

  function handleSignInClick(event: any) {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  return (
    <main className="main">
      {isAuthenticated ? (
        <>
          {router}

          <TemplateGlobalNavigationBar />
        </>
      ) : (
        <div className="main__sign-in">
          <button
            className="main__sign-in__content"
            type="button"
            onClick={handleSignInClick}
          >
            <h2 className="main__sign-in__content__title">로그인 하기</h2>

            <div className="main__sign-in__content__icon">
              <div className="main__sign-in__content__icon__item">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="52">
                  <defs>
                    <path id="a" d="M.522.73h18.635v22.877H.522z" />
                  </defs>
                  <g fill="none">
                    <path
                      d="M51.529 16.675c-5.929-2.337-11.917-2.088-13.435.648-1.534 2.758.7 9.288 4.914 14.71 4.213 5.42 10.17 5.243 13.456-.677 3.234-5.9.977-12.352-4.935-14.681"
                      fill="#FF9700"
                    />
                    <path
                      d="M21.325 18.564c5.26 3.592 11.151 4.679 13.239 2.349 2.106-2.349 1.379-9.21-1.527-15.429C30.133-.732 24.29-1.88 19.772 3.158 15.31 8.193 16.08 14.98 21.325 18.564"
                      fill="#006ECD"
                    />
                    <g transform="translate(20.984 25.322)">
                      <path
                        d="M19.21 12.152C18.366 5.835 15.236.726 12.106.73 8.952.732 4.332 5.86 1.645 12.18c-2.684 6.317.368 11.435 7.137 11.428 6.73-.046 11.269-5.156 10.427-11.455"
                        fill="#EF151E"
                        mask="url(#b)"
                      />
                    </g>
                    <path
                      d="M16.03 21.054c-1.074 0-1.795.662-1.795 1.646v.991h2.547s.086 8.408-.01 9.289c-.097.88-.321 2.314-1.896 3.066-1.36.649-1.386 1.263-1.474 1.808-.113.708.02.799.535.672 2.025-.496 4.18-1.31 5.27-3.31.593-1.087.829-2.264.829-4.051V23.69c1.079-.012 1.858-.7 1.858-1.645v-.99h-5.865zM13.196 32.39s-2.044 2.933-6.013 2.933C3.087 35.323 0 32.187 0 28.028c0-4.215 3.087-7.392 7.183-7.392 3.898 0 5.961 2.93 5.961 2.93s-1.091 1.169-2.139 1.169c-.511 0-.893-.236-1.335-.509-.592-.365-1.263-.779-2.487-.779-2.33 0-4.223 2.055-4.223 4.581 0 2.474 1.894 4.486 4.223 4.486 1.382 0 2.03-.396 2.604-.746.407-.25.793-.484 1.35-.484 1.179 0 2.06 1.106 2.06 1.106"
                      fill="#000"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
