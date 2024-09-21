import React from 'react';

function ModalLayout({ children ,newPriceForm}) {
  return (
    <>
      <div className="modal">
        {children}
        <div className="basket_info-price modal_result">
          <div>Итого </div>
          <div>{newPriceForm}</div>
        </div>
      </div>
      <div className="modal__wrapper"></div>
    </>
  );
}

export default ModalLayout;
