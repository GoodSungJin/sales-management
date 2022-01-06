import React from 'react';

import './CreateSheetModal.scss';

import TemplateBaseModal, { Props as BaseModalProps } from './BaseModal';
import TemplateCreateSheet, { Props as CreateSheetProps } from '../CreateSheet';

function TemplateModalCreateSheet({
  onSubmit,
  duration,
  isOpen,
  isShow,
  onClickClose,
}: Props) {
  return (
    <TemplateBaseModal
      duration={duration}
      isOpen={isOpen}
      isShow={isShow}
      onClickClose={onClickClose}
    >
      <div className="modal-create-sheet">
        <TemplateCreateSheet onSubmit={onSubmit} />
      </div>
    </TemplateBaseModal>
  );
}

export default TemplateModalCreateSheet;

interface Props extends BaseModalProps, CreateSheetProps {}
