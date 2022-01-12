import React, { ReactNode, useEffect, useRef } from 'react';

import '../../assets/styles/components/modals/_base-modal.scss';

function ModalBase({
  children,
  isShow,
  isOpen,
  duration,
  onClickClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current!.style.transition = `opacity ${duration}ms`;
    // eslint-disable-next-line
  }, [ref.current, duration]);

  if (!isOpen) return null;
  return (
    <div className={`base-modal ${isShow && 'active'}`} ref={ref}>
      <div
        className="base-modal__backdrop"
        onClick={onClickClose}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="close"
        aria-hidden
      />

      <div className="base-modal__content">{children}</div>
    </div>
  );
}

export default ModalBase;

export interface Props {
  children?: ReactNode;
  isOpen: boolean;
  isShow: boolean;
  duration: number;
  onClickClose: () => void;
}
