import React from 'react';
import { formattedPrice } from '../../utils';

function ItemBasket({ item, handler }) {
  const { code, title, price, count } = item;
  const newPriceForm = formattedPrice(price);

  return (
    <div className={'Item'}>
      <div className="Item-code">{code}</div>
      <div className="Item-title">
        {title}
        <div className="Item-information">
          <div>{newPriceForm}</div>
          <div>{count} шт</div>
        </div>
      </div>

      <div className="Item-actions">
        <button className="btn" onClick={() => handler(item)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default ItemBasket;
