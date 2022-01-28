import React, { HTMLInputTypeAttribute, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import * as CSS from 'csstype';

import '../../assets/styles/components/molecules/_daily-sales-input-label.scss';

function MoleculeDailySalesInputLabel({
  children,
  type,
  register,
  placeholder = '',
  flexDirection = 'row',
}: Props) {
  return (
    <label
      className="daily-sales-label"
      style={{
        flexDirection,
      }}
    >
      <span>{children}</span>
      <input
        {...register}
        className="daily-sales-label__input"
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
}

export default MoleculeDailySalesInputLabel;

interface Props {
  children: ReactNode;
  type: HTMLInputTypeAttribute;
  register: UseFormRegisterReturn;
  placeholder?: string;
  flexDirection?: CSS.Property.FlexDirection;
}
