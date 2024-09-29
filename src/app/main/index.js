import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/layouts/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';

import { useParams } from 'react-router-dom';
import { useLocalization } from '../../store/localization/localizetion-context';

function Main() {
  const { page } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load({ skip: (page - 1) * 10 });
    store.actions.catalog.maxCountProducts();
  }, [page]);

  const fetchProduct = currentPage => {
    store.actions.catalog.load({ skip: currentPage * 10 });
  };

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    maxCountProducts: state.catalog.maxCountProducts,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeLanguage: () => store.actions.catalog.changeLanguage(),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} language={select.language} />;
      },
      [callbacks.addToBasket, select.language],
    ),
  };
  const { translation, language } = useLocalization();
  return (
    <PageLayout>
      <Head title={translation[language].head.headTitle} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination totalItems={select.maxCountProducts} fetchProduct={fetchProduct} />
    </PageLayout>
  );
}

export default memo(Main);
