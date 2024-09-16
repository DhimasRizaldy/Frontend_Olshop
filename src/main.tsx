import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Provider } from 'react-redux'; // Import Provider dari react-redux
import store from './redux/store/store'; // Import Redux store Anda

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Bungkus Router dengan Provider */}
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
