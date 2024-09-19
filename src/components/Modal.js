import React, { useCallback } from 'react';
import Head from './Head';
import Controls from './Controls';
import { useStore } from '../hook/useStore';
import List from './List';
import PropTypes from 'prop-types';

function Modal({ handler, valueHandler }) {
  const {
    state: { basketList, totalPrice },
    reducers: { deleteItem },
  } = useStore();
  const deleteHandler = useCallback(
    item => {
      deleteItem(item.code);
    },
    [deleteItem],
  );
  return (
    <>
      <div className="modal">
        <Head title="Корзина" />
        <Controls handler={handler} valueHandler={valueHandler} titleHandler="Закрыть" />
        <List
          list={basketList}
          emptyListTitle={'Корзина пуста'}
          handler={deleteHandler}
          titleHandler={'Удалить'}
        />
        <div className="basket_info-price modal_result">
          <div>Итого </div>
          <div>{totalPrice} ₽</div>
        </div>
      </div>
      <div className="modal__wrapper"></div>
    </>
  );
}

Modal.propTypes = {
  handler: PropTypes.func,
  valueHandler: PropTypes.bool,
};

export default Modal;
