import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ShoeGrid from './components/ShoeGrid';
import Shoecards from './components/Shoecards';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar /> 


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/shoes" element={<ShoeGrid />} />
        <Route path="/shoe/:id" element={<Shoecards />} />
      </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
