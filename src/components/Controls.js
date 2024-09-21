import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStore } from '../hook/useStore';
import { formattedPrice, plural } from '../utils';

function Controls({ valueHandler, handler, titleHandler }) {
  const {
    state: { basketCount, totalPrice },
  } = useStore();

  const itemVariants = {
    zero: 'товаров',
    one: 'товар',
    few: 'товара',
    many: 'товаров',
    other: 'товаров',
  };
  const newPriceForm = formattedPrice(totalPrice);

  return (
    <>
      <div className="basket">
        {valueHandler ? (
          ''
        ) : (
          <>
            <div>В корзине: </div>

            <div className="basket_info-price">
              {basketCount === 0
                ? 'пусто'
                : `${basketCount} ${plural(basketCount, itemVariants)} / ${newPriceForm}`}
            </div>
          </>
        )}

        <div className={`Controls ${valueHandler ? 'Controls_close-modal' : ''}`}>
          <button className="btn" onClick={() => handler(!valueHandler)}>
            {titleHandler}
          </button>
        </div>
      </div>
    </>
  );
}

Controls.propTypes = {
  valueHandler: PropTypes.bool,
  handler: PropTypes.func,
  titleHandler: PropTypes.string,
};

export default React.memo(Controls);
