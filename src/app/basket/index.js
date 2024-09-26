import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/layouts/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { engDictBasket, ruDictBasket } from './dict';

function Basket() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.catalog.language,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback((_id) => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            language={select.language}
            onClose={callbacks.closeModal}
          />
        );
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout
      title={select.language === 'ru' ? ruDictBasket.basketTitle : engDictBasket.basketTitle}
      onClose={callbacks.closeModal}
      language={select.language}>
      <List list={select.list} renderItem={renders.itemBasket} onClose={callbacks.closeModal} />
      <BasketTotal sum={select.sum} language={select.language} />
    </ModalLayout>
  );
}

export default memo(Basket);
