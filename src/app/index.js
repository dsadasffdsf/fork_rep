import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetalPage from './pages/detalPage';
import Layout from './pages/Layout';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/products/:id" element={<DetalPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
