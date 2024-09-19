import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Item({ item, handler, titleHandler }) {
  const { code, title, price, count } = item;

  return (
    <div className={'Item'}>
      <div className="Item-code">{code}</div>
      <div className="Item-title">
        {title}{' '}
        <div className="Item-information">
          <div>{price} ₽</div>
          {titleHandler == 'Удалить' ? <div>{count} шт</div> : ''}
        </div>
      </div>

      <div className="Item-actions">
        <button onClick={() => handler(item)}>{titleHandler}</button>
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
