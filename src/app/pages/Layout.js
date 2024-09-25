import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import BasketProvider from '../../components/basket-provider';

const Layout = () => {
  return (
    <>
      <BasketProvider>
        <Outlet />
      </BasketProvider>
    </>
  );
};

export default Layout;
