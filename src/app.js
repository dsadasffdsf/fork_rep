import React, { useCallback, useState } from 'react';
import List from './components/List';
import Controls from './components/Controls';
import Head from './components/Head';
import PageLayout from './components/PageLayout';
import { useStore } from './hook/useStore';
import Modal from './components/Modal';

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
      addBasket(item);
    },
    [addBasket],
  );

  return (
    <>
      <PageLayout>
        <Head title="Приложение на чистом JS" />
        <Controls valueHandler={modal} handler={modalHandler} titleHandler="Перейти" />
        <List
          list={list}
          handler={basketHandler}
          emptyListTitle={'Товар не обнаружен'}
          titleHandler={'Добавить'}
        />
      </PageLayout>
      {modal ? <Modal valueHandler={modal} handler={modalHandler} /> : ''}
    </>
  );
}

export default App;
