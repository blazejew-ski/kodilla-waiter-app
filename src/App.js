import NavBar from './components/common/NavBar/NavBar.js';
import Home from './components/pages/Home/Home.js';
import Table from './components/pages/Table/Table.js';
import NotFound from './components/pages/NotFound/NotFound.js';
import Footer from './components/common/Footer/Footer.js';
import { Routes, Route } from 'react-router-dom';
import { fetchTables } from './redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
    console.log('dispatch fetchTables');
  }, [dispatch]);


  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:tableId" element={<Table />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
