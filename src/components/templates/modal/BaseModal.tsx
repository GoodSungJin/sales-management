import React, { ReactNode, useEffect, useRef } from 'react';

import './BaseModal.scss';

function TemplateBaseModal({
  children,
  isShow,
  isOpen,
  duration,
  onClickClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.style.transition = `opacity ${duration}ms`;
  }, [duration]);

  if (!isOpen) return null;
  return (
    <div className={`base-modal ${isShow && 'active'}`} ref={ref}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="base-modal__backdrop" onClick={onClickClose} />
      <div className="base-modal__content">{children}</div>
    </div>
  );
}

export default TemplateBaseModal;

export interface Props {
  children?: ReactNode;
  isOpen: boolean;
  isShow: boolean;
  duration: number;
  onClickClose: () => void;
}
