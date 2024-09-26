import Main from './main';
import { Route, Routes } from 'react-router-dom';
import DetalPage from './detalPage';
import Layout from './Layout';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/products/:id" element={<DetalPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
