import React from 'react';

import './Home.scss';

// @ts-ignore
import logo from '../../assets/images/logo.png';

function PageHome() {
  function handleSignOutClick(event: any) {
    window.gapi.auth2.getAuthInstance().signOut();
  }
  return (
    <section className="home">
      <div className="home__image">
        <img src={logo} alt="" />
      </div>

      <div className="home__content">
        <p>
          어머니 오늘도 고생하셨습니다. <br />
          조심히 퇴근하시옵소서.
        </p>
      </div>
    </section>
  );
}

export default PageHome;
