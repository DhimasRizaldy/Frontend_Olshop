import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleProvider;
