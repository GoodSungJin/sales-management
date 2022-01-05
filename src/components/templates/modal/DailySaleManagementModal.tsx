import React, { useEffect, useRef } from 'react';

import './DailySaleManagementModal.scss';

import TemplateDailySalesManagement from '../DailySalesManagement';

function TemplateDailySaleManagementModal({
  currDate,
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
    <div className={`daily-sales-modal ${isShow && 'active'}`} ref={ref}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="daily-sales-modal__backdrop" onClick={onClickClose} />
      <div className="daily-sales-modal__content">
        <TemplateDailySalesManagement currDate={currDate} />
      </div>
    </div>
  );
}

export default TemplateDailySaleManagementModal;

interface Props {
  currDate: string;
  isOpen: boolean;
  isShow: boolean;
  duration: number;
  onClickClose: () => void;
}
