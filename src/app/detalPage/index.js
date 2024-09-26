import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import DetalPageLayout from '../../components/layouts/detalPage-layout';
import DetalPageDesc from '../../components/detalPage-desc';

function DetalPage() {
  const store = useStore();
  const location = useLocation();
  const select = useSelector((state) => ({
    detalProduct: state.catalog.detalProduct,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.catalog.language,
    activeModal: state.modals.name,
  }));

  useEffect(() => {
    store.actions.catalog.fetchItemById(location.state);
  }, [select.activeModal]);

  if (!select.detalProduct) {
    return <div>Loading...</div>;
  }
  const callbacks = {
    // Добавление в корзину
    addToBasket: (_id) => store.actions.basket.addToBasket(_id),
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
          language={select.language}
        />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          language={select.language}
        />
        <DetalPageDesc
          product={select.detalProduct}
          addToBasket={callbacks.addToBasket}
          language={select.language}
        />
      </DetalPageLayout>
    </>
  );
}

export default DetalPage;
