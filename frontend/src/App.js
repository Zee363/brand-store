import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/sidebar" element={<Sidebar />}></Route>
        <Route path='/users' element={<Users />}></Route>
       
      </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
