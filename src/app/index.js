import Main from './main';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import DetalPage from './detal-page';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/page/1" replace />} />
          <Route path="/products/:id" element={<DetalPage />}></Route>
          <Route path="/page/:page?" element={<Main />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
