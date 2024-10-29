// import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import HomePage from './pages/HomePage';
// import ErrorPage from './pages/ErrorPage';
// import { isConnected as checkIsConnected } from './services/isConnected';
// import Navbar from './components/Navbar';
// import UserProfile from './pages/UserProfile';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   const updateAuthenticationStatus = async () => {
//     const result = await checkIsConnected();
//     setIsAuthenticated(result.isAuthenticated);
//   };

//   useEffect(() => {
//     updateAuthenticationStatus();
//   }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <BrowserRouter>
//       {isAuthenticated ? (
//         <>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<HomePage updateAuthStatus={updateAuthenticationStatus} />} />
//             <Route path='/profile' element={<UserProfile />} />
//             <Route path="*" element={<ErrorPage />} />
//           </Routes>
//         </>
//       ) : (
//         <>
//           <Routes>
//             <Route path="/" element={<LoginPage updateAuthStatus={updateAuthenticationStatus} />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="*" element={<ErrorPage />} />
//           </Routes>
//         </>
//       )}
//     </BrowserRouter>
//   );
// };

// export default App;

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import ErrorPage from './pages/ErrorPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'

const App = () => {
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
