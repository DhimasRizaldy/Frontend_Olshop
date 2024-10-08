import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Provider } from 'react-redux'; // Import Provider dari react-redux
import store from './redux/store/store'; // Import Redux store Anda
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider dari @react-oauth/google
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        {/* Bungkus Router dengan Provider */}
        <Router>
          <App />
          {/* <ToastContainer /> */}
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
);
