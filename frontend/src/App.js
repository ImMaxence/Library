import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import CreateBooks from './pages/CreateBooks';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-book" element={<CreateBooks />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>

    </BrowserRouter>
  );
};

export default App;
