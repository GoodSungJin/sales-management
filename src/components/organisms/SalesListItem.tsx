import React, { ChangeEvent, MouseEvent } from 'react';
import { BsTrash } from 'react-icons/bs';

import './SalesListItem.scss';

import MoleculeDailySalesInputLabel from '../molecules/DailySalesInputLabel';

function OrganismSalesListItem({
  productNameValue,
  quantityValue,
  priceValue,
  onChangeInput,
  onClickDelete,
}: Props) {
  return (
    <li className="sales-list-item">
      <div className="sales-list-item__input-group">
        <MoleculeDailySalesInputLabel
          onChange={onChangeInput}
          type="text"
          value={productNameValue}
          placeholder="제품명을 입력해주세요."
          name="name"
        >
          제품명
        </MoleculeDailySalesInputLabel>

        <div className="sales-list-item__input-group__bottom">
          <div className="sales-list-item__input-group__bottom__input">
            <MoleculeDailySalesInputLabel
              onChange={onChangeInput}
              type="number"
              value={quantityValue}
              name="quantity"
            >
              수량
            </MoleculeDailySalesInputLabel>
          </div>
          <div className="sales-list-item__input-group__bottom__input">
            <MoleculeDailySalesInputLabel
              type="number"
              value={priceValue}
              onChange={onChangeInput}
              name="price"
            >
              가격
            </MoleculeDailySalesInputLabel>
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="sales-list-item__delete-icon" onClick={onClickDelete}>
        <BsTrash size="100%" />
      </div>
    </li>
  );
}

export default OrganismSalesListItem;

type FnOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => void;
type FnOnClickDelete = (e: MouseEvent<HTMLDivElement>) => void;
interface Props {
  onChangeInput: FnOnChangeInput;
  onClickDelete: FnOnClickDelete;
  productNameValue: string;
  quantityValue: number;
  priceValue: number;
}
