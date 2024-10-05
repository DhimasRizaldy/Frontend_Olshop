import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode'; // Pastikan ini import yang benar

const ProtectedRoute = ({ children, ...rest }) => {
  const cookies = new Cookies();
  const token = cookies.get('authToken'); // Ambil token dari cookies

  // Function untuk mengecek apakah token valid atau tidak expired
  const isTokenValid = (token) => {
    if (!token) return false; // Tambahkan pemeriksaan untuk token yang tidak ada
    try {
      const decoded = jwtDecode(token); // Decode token JWT
      const currentTime = Date.now() / 1000; // Waktu sekarang dalam detik
      return !(decoded.exp && decoded.exp < currentTime); // Token valid jika belum expired
    } catch (error) {
      return false; // Jika terjadi error saat decoding, berarti token invalid
    }
  };

  return isTokenValid(token) ? (
    React.cloneElement(children, rest)
  ) : (
    <Navigate to="/" />
  ); // Navigasi ke homepage jika token invalid
};

export default ProtectedRoute;
