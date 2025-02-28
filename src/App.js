import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './Component/LoginPage/LoginPage';
import HomePage from './Component/HomePage/HomePage';
import HistoryPage from './Component/HistoryPage/HistoryPage';

let App = () => {
  let state = useSelector((a) => a.data);
  console.log(state);

  return (
    <HashRouter>
      {state.IsLogin ? (
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Transactions' element={<HistoryPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<LoginPage />} />
        </Routes>
      )}
    </HashRouter>
  );
}

export default App;
