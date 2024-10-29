import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import ErrorPage from './pages/ErrorPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'

const App = () => {

  // faire le verify token

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
