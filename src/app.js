import React, { useCallback, useState } from 'react';
import List from './components/List';
import Controls from './components/Controls';
import Head from './components/Head';
import PageLayout from './components/Layouts/PageLayout';
import { useStore } from './hook/useStore';
import Modal from './components/Modal';
import ItemBasket from './components/Items/ItemBasket';
import Item from './components/Items/Item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App() {
  const {
    state: { list },
    reducers: { addBasket },
  } = useStore();

  const [modal, setModal] = useState(false);
  const modalHandler = useCallback(() => {
    setModal(prev => !prev);
  }, []);
  const basketHandler = useCallback(
    item => {
      addBasket(item.code);
    },
    [addBasket],
  );

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls valueHandler={modal} handler={modalHandler} titleHandler="Перейти" />
        <List list={list} emptyListTitle={'Товар не обнаружен'}>
          {item => <Item item={item} handler={basketHandler} />}
        </List>
      </PageLayout>
      {modal ? <Modal valueHandler={modal} handler={modalHandler} /> : ''}
    </>
  );
}

export default App;
