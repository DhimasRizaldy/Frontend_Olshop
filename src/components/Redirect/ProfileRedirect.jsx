// components/ProfileRedirect.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileRedirect = () => {
  const navigate = useNavigate();

  // Mengambil role pengguna dari Redux state
  const userRole = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    if (userRole) {
      if (userRole === 'ADMIN') {
        navigate('/admin/profile'); // Redirect ke profil admin
      } else if (userRole === 'USER') {
        navigate('/user/profile'); // Redirect ke profil user
      }
    }
  }, [userRole, navigate]);

  return null; // Tidak perlu render apapun
};

export default ProfileRedirect;
