import React from 'react';

function ModalLayout({ children }) {
  return (
    <>
      <div className="modal">{children}</div>
      <div className="modal__wrapper"></div>
    </>
  );
}

export default ModalLayout;
