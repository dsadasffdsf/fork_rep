import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../../../store/use-store';
import useSelector from '../../../store/use-selector';
import Head from '../../../components/head';
import BasketTool from '../../../components/basket-tool';
import PageLayout from '../../../components/page-layout';
import BasketProvider from '../../../components/basket-provider';

function DetalPage() {
  const store = useStore();
  const location = useLocation();

  useEffect(() => {
    store.actions.catalog.fetchItemById(location.state);
  }, []);
  const select = useSelector((state) => ({
    detalProduct: state.catalog.detalProduct,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  if (!select.detalProduct) {
    return <div>Loading...</div>;
  }
  const callbacks = {
    // Добавление в корзину
    addToBasket: (_id) => store.actions.basket.addToBasket(_id),
    // Открытие модалки корзины
    openModalBasket: () => store.actions.modals.open('basket'),
  };

  console.log(select.detalProduct._id, '--------------------');

  return (
    <div>
  
        <PageLayout>
          <Head title="Магазин" />
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
          <h1>{select.detalProduct.title}</h1>
          <p>{select.detalProduct.description}</p>
          <p>Price: {select.detalProduct.price}</p>
        </PageLayout>

    </div>
  );
}

export default DetalPage;
