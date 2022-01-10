import React from 'react';

import './DailySaleManagementModal.scss';

import TemplateDailySalesManagement, {
  Props as DailySalesProps,
} from '../DailySalesManagement';
import TemplateBaseModal, { Props as BaseModalProps } from './BaseModal';

function TemplateDailySaleManagementModal({
  currDate,
  isShow,
  isOpen,
  duration,
  onClickClose,
}: Props) {
  return (
    <TemplateBaseModal
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
    </TemplateBaseModal>
  );
}

export default TemplateDailySaleManagementModal;

interface Props extends BaseModalProps, DailySalesProps {}
