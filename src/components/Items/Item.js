import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formattedPrice } from '../../utils';

function Item({ item, handler }) {
  const { code, title, price } = item;
  const newPriceForm = formattedPrice(price);

  return (
    <div className={'Item'}>
      <div className="Item-code">{code}</div>
      <div className="Item-title">
        {title}{' '}
        <div className="Item-information">
          <div>{newPriceForm}</div>
        </div>
      </div>

      <div className="Item-actions">
        <button className="btn" onClick={() => handler(item)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  handler: PropTypes.func,
  titleHandler: PropTypes.string,
};

export default React.memo(Item);
