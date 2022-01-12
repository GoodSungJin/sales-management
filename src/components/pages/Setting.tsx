import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import '../../assets/styles/components/pages/_setting.scss';

function PageSetting() {
  function handleSignOutClick(event: any) {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <div className="setting">
      <div className="setting__image">
        <AiOutlineUser size="100%" />
      </div>

      <section className="setting__info">
        <h3 className="setting__info__title">정보 관리</h3>
        <ul className="setting__info__list">
          <button
            type="button"
            className="setting__info__list__item"
            onClick={handleSignOutClick}
          >
            로그아웃
          </button>
        </ul>
      </section>
    </div>
  );
}

export default PageSetting;
