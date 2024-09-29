import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import DetalPageLayout from '../../components/layouts/detal-page-layout';
import DetalPageDesc from '../../components/detal-page-desc';

function DetalPage() {
  const store = useStore();
  const location = useLocation();
  const select = useSelector(state => ({
    detalProduct: state.detalProduct.detalProduct ,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeModal: state.modals.name,
  }));
  console.log(select.detalProduct);

  useEffect(() => {
    store.actions.detalProduct.fetchItemById(location.state);
  }, [select.activeModal]);

  if (!select.detalProduct) {
    return <div>Loading...</div>;
  }
  const callbacks = {
    // Добавление в корзину
    addToBasket: _id => store.actions.basket.addToBasket(_id),
    // Открытие модалки корзины
    openModalBasket: () => store.actions.modals.open('basket'),
    changeLanguage: () => store.actions.catalog.changeLanguage(),
  };

  return (
    <>
      <DetalPageLayout>
        <Head
          title={select.detalProduct.title}
          changeLanguage={callbacks.changeLanguage}

        />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}

        />
        <DetalPageDesc
          product={select.detalProduct}
          addToBasket={callbacks.addToBasket}

        />
      </DetalPageLayout>
    </>
  );
}

export default DetalPage;
