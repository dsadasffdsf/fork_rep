import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import BasketProvider from '../components/basket-provider';
import { LocalizationProvider } from '../store/localization/localizetion-context';

const Layout = () => {
  return (
    <>
      <LocalizationProvider>
        <BasketProvider>
          <Outlet />
        </BasketProvider>
      </LocalizationProvider>
    </>
  );
};

export default Layout;
