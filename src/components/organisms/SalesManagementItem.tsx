import React, { MouseEvent } from 'react';
import { BsTrash } from 'react-icons/bs';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';

import '../../assets/styles/components/organisms/_sales-management-item.scss';

import MoleculeDailySalesInputLabel from '../molecules/DailySalesInputLabel';

function OrganismSalesManagementItem({
  onClickDelete,
  priceRegister,
  nameRegister,
  quantityRegister,
}: Props) {
  return (
    <li className="sales-list-item">
      <div className="sales-list-item__input-group">
        <MoleculeDailySalesInputLabel
          register={nameRegister}
          type="text"
          placeholder="제품명을 입력해주세요."
        >
          제품명
        </MoleculeDailySalesInputLabel>

        <div className="sales-list-item__input-group__bottom">
          <div className="sales-list-item__input-group__bottom__input">
            <MoleculeDailySalesInputLabel
              register={quantityRegister}
              type="number"
            >
              수량
            </MoleculeDailySalesInputLabel>
          </div>
          <div className="sales-list-item__input-group__bottom__input">
            <MoleculeDailySalesInputLabel
              register={priceRegister}
              type="number"
            >
              가격
            </MoleculeDailySalesInputLabel>
          </div>
        </div>
      </div>

      <button
        className="sales-list-item__delete-icon"
        type="button"
        onClick={onClickDelete}
      >
        <BsTrash size="100%" />
      </button>
    </li>
  );
}

export default OrganismSalesManagementItem;

type FnOnClickDelete = (e: MouseEvent<HTMLButtonElement>) => void;
interface Props {
  nameRegister: UseFormRegisterReturn;
  quantityRegister: UseFormRegisterReturn;
  priceRegister: UseFormRegisterReturn;
  onClickDelete: FnOnClickDelete;
}
