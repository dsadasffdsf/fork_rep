import React from 'react';
import Basket from '../../app/basket';
import useSelector from '../../store/use-selector';

function BasketProvider({ children }) {
    const activeModal = useSelector(state => state.modals.name);
  return (
    <>
      <div>{children}</div>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default BasketProvider;
