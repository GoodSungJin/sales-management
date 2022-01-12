import React from 'react';

import '../../assets/styles/components/modals/_daily-sales-management.scss';

import TemplateDailySalesManagement, {
  Props as DailySalesProps,
} from '../templates/DailySalesManagement';
import ModalBase, { Props as BaseModalProps } from './Base';

function ModalDailySaleManagement({
  currDate,
  isShow,
  isOpen,
  duration,
  onClickClose,
}: Props) {
  return (
    <ModalBase
      duration={duration}
      isOpen={isOpen}
      isShow={isShow}
      onClickClose={onClickClose}
    >
      <div className="daily-sales-modal__content">
        <TemplateDailySalesManagement
          currDate={currDate}
          onClickComplete={onClickClose}
        />
      </div>
    </ModalBase>
  );
}

export default ModalDailySaleManagement;

interface Props extends BaseModalProps, DailySalesProps {}
