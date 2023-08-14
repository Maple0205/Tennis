import './App.css';
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import TennisLayout from './pages/Layout';
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/dashboard" element={<TennisLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
