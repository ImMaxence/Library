import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import { isConnected as checkIsConnected } from './services/isConnected';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const updateAuthenticationStatus = async () => {
    const result = await checkIsConnected();
    setIsAuthenticated(result.isAuthenticated);
  };

  useEffect(() => {
    updateAuthenticationStatus();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<HomePage updateAuthStatus={updateAuthenticationStatus} />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage updateAuthStatus={updateAuthenticationStatus} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
