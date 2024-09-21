import React from 'react';

function FinalPrice({newPriceForm}) {
  return (
    <div className="basket_info-price modal_result">
      <div>Итого </div>
      <div>{newPriceForm}</div>
    </div>
  );
}

export default FinalPrice;
