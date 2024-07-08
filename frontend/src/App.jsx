import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componets/Login';
import Result from './componets/Result';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
