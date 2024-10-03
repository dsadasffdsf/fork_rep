import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Menu from '../../components/menu';
import BasketTool from '../../components/basket-tool';
import SideLayout from '../../components/side-layout';
import NavMenu from '../../components/nav-menu';
import { useNavigate } from 'react-router-dom';

/**
 * Контейнер с компонентами навигации
 */
function Navigation({ children }) {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
    username: state.auth.dto.name,
  }));


  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('X-Token');
    setToken(token);
  }, [store, navigate]);

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Обработка перехода на главную
    onNavigate: useCallback(
      item => {
        if (item.key === 1) store.actions.catalog.resetParams();
      },
      [store],
    ),
    onAuth: useCallback(() => {
      navigate('/login');
    }, []),
    onProfile: useCallback(() => {
      navigate('/profile');
    }, []),
    onLogout: useCallback(() => {
      store.actions.auth.fetchDelAuthToken();
      localStorage.removeItem('X-Token');
      setToken(null);
      navigate('/login');
    }, []),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  const options = {
    menu: useMemo(() => [{ key: 1, title: t('menu.main'), link: '/' }], [t]),
  };

  return (
    <>
      {token ? (
        <NavMenu onNavigate={callbacks.onLogout} btnTitle={'Выход'} username={select.username} />
      ) : (
        <NavMenu onNavigate={callbacks.onAuth} btnTitle={'Вход'} />
      )}
      {children}
      <SideLayout side="between">
        <Menu items={options.menu} onNavigate={callbacks.onNavigate} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          t={t}
        />
      </SideLayout>
    </>
  );
}

export default memo(Navigation);
