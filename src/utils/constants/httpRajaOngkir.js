import axios from 'axios';

// Membaca baseURL dari variabel lingkungan
const baseURL = import.meta.env.VITE_API_SERVER || 'http://localhost:3000'; // Ganti dengan URL default jika diperlukan

const httpRajaOngkir = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default httpRajaOngkir;
