// src/Routes/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

const ProtectedRoute = () => {
  const { isLogin } = useContext(AuthContext);

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
