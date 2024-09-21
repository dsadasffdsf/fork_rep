import React, { useCallback } from 'react';
import Head from './Head';
import Controls from './Controls';
import { useStore } from '../hook/useStore';
import List from './List';
import PropTypes from 'prop-types';
import { formattedPrice } from '../utils';
import ModalLayout from './Layouts/ModalLayout';
import ItemBasket from './Items/ItemBasket';
import FinalPrice from './FinalPrice';

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
  const newPriceForm = formattedPrice(totalPrice);
  return (
    <>
      <ModalLayout>
        <Head title="Корзина" />
        <Controls handler={handler} valueHandler={valueHandler} titleHandler="Закрыть" />
        <List list={basketList} emptyListTitle={'Корзина пуста'}>
          {item => <ItemBasket item={item} handler={deleteHandler} />}
        </List>
        <FinalPrice newPriceForm={newPriceForm} />
      </ModalLayout>
    </>
  );
}

Modal.propTypes = {
  handler: PropTypes.func,
  valueHandler: PropTypes.bool,
};

export default Modal;
