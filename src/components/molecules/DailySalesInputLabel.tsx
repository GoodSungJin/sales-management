import React, {
  ChangeEvent,
  CSSProperties,
  HTMLInputTypeAttribute,
  ReactNode,
} from 'react';

import './DailySalesInputLabel.scss';
import * as CSS from 'csstype';

function MoleculeDailySalesInputLabel({
  children,
  type,
  value,
  onChange,
  placeholder = '',
  name = '',
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
        className="daily-sales-label__input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </label>
  );
}

export default MoleculeDailySalesInputLabel;

interface Props {
  children: ReactNode;
  type: HTMLInputTypeAttribute;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  flexDirection?: CSS.Property.FlexDirection;
}
