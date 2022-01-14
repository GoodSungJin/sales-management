import React from 'react';

import '../../assets/styles/components/modals/_notification.scss';

import ModalBase, { Props as ModalBaseProps } from './Base';

function ModalNotification({
  isShow,
  isOpen,
  duration,
  onClickClose,
  children,
}: Props) {
  return (
    <ModalBase
      isOpen={isOpen}
      isShow={isShow}
      duration={duration}
      onClickClose={onClickClose}
    >
      <div className="notification">{children}</div>
    </ModalBase>
  );
}

export default ModalNotification;

interface Props extends ModalBaseProps {}
