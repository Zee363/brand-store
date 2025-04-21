import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar /> 
      <Routes>
      </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
