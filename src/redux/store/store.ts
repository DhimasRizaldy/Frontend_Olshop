// store/store.ts
import { createStore, combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';

// Gabungkan semua reducer menjadi satu root reducer
const rootReducer = combineReducers({
  auth: authReducer, // Gabungkan reducer auth ke dalam root reducer
});

// Buat store Redux menggunakan root reducer
const store = createStore(rootReducer);

// Definisikan tipe untuk state Root dan dispatch aplikasi
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Ekspor store sebagai default
export default store;
