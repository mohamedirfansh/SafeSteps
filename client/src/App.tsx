import { useState, useEffect } from 'react';
import { auth } from './firebase-utils/auth';
import { onAuthStateChanged } from 'firebase/auth';

import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import DashboardPage from './pages';
import SignInPage from './pages/authentication/sign-in';
import SignUpPage from './pages/authentication/sign-up';
import UserListPage from './pages/users/list';

export const App = function () {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider value={{ currentUser }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} index />
          <Route path="/authentication/sign-in" element={<SignInPage />} />
          <Route path="/authentication/sign-up" element={<SignUpPage />} />
          <Route path="/patients/list" element={<UserListPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
