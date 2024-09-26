import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/layouts/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { engDictHead, ruDictHead } from './dict';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.catalog.maxOrder();
  }, []);

  const fetchProduct = (currentPage) => {
    store.actions.catalog.load({ skip: currentPage * 10 });
  };

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    maxOrder: state.catalog.maxOrder,
    language: state.catalog.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeLanguage: () => store.actions.catalog.changeLanguage(),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} language={select.language} />;
      },
      [callbacks.addToBasket, select.language],
    ),
  };

  return (
    <PageLayout>
      <Head
        title={select.language === 'ru' ? ruDictHead.headTitle : engDictHead.headTitle}
        changeLanguage={callbacks.changeLanguage}
        language={select.language}
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination totalPage={5} totalItems={select.maxOrder} fetchProduct={fetchProduct} />
    </PageLayout>
  );
}

export default memo(Main);
