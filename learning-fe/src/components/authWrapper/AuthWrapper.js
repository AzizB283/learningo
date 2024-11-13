import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthWrapper({ children }) {
  const token = localStorage.getItem('accessToken');

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, [token, navigate]);

  // Show nothing if token is not present
  if (!token) {
    return null;
  }

  return <>{children}</>;
}

export default AuthWrapper;
