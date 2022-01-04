import React, { ChangeEvent, useState } from 'react';

import './DailySalesManagement.scss';

function TemplateDailySalesManagement() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1);

  const handleChangeQuantity = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(+value);
  };

  const handleChangePrice = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setPrice(+value);
  };

  const handleChangeProductName = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setProductName(value);
  };

  return (
    <section className="daily-sales">
      <ul className="daily-sales__list">
        <li className="daily-sales__list__item">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="daily-sales__list__item__label">
            제품명
            <input
              type="text"
              placeholder="제품명을 입력해주세요."
              value={productName}
              onChange={handleChangeProductName}
              className="daily-sales__list__item__label__input-product-name"
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="daily-sales__list__item__label">
            수량
            <input
              type="number"
              value={quantity}
              onChange={handleChangeQuantity}
              className="daily-sales__list__item__label__input-quantity"
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="daily-sales__list__item__label">
            가격
            <input
              type="number"
              value={price}
              onChange={handleChangePrice}
              className="daily-sales__list__item__label__input-price"
            />
          </label>
        </li>
      </ul>

      <button type="button">추가하기</button>
    </section>
  );
}

export default TemplateDailySalesManagement;
