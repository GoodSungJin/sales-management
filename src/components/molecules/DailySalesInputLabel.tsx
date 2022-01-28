import React, {
  ChangeEvent,
  KeyboardEvent,
  HTMLInputTypeAttribute,
  ReactNode,
} from 'react';
import * as CSS from 'csstype';

import '../../assets/styles/components/molecules/_daily-sales-input-label.scss';
import {
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form/dist/types/form';

function MoleculeDailySalesInputLabel({
  children,
  type,
  defaultValue = '',
  value,
  onChange,
  onKeyUp,
  register,
  placeholder = '',
  name = '',
  flexDirection = 'row',
  autoComplete = 'off',
  tabIndex = 0,
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
  defaultValue?: string | number;
  value?: string | number;
  register?: UseFormRegisterReturn;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  flexDirection?: CSS.Property.FlexDirection;
  autoComplete?: 'on' | 'off';
  tabIndex?: -1 | 0;
}
