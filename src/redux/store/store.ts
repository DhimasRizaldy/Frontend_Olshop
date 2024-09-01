// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import cartReducer from '../reducers/cartSlice';

// Gabungkan semua reducer menjadi satu root reducer
const rootReducer = combineReducers({
  auth: authReducer, // Gabungkan reducer auth ke dalam root reducer
  cart: cartReducer, // Gabungkan reducer cart ke dalam root reducer
});

// Buat store Redux menggunakan root reducer
const store = configureStore({
  reducer: rootReducer,
});

// Definisikan tipe untuk state Root dan dispatch aplikasi
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Ekspor store sebagai default
export default store;
