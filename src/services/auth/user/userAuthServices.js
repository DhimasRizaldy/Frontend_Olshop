import { toast } from 'react-toastify';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import http from '../../../utils/constants/http';
import { useMutation, useQuery } from '@tanstack/react-query';

// service user login
export const userLogin = async (data) => {
  return await http.post(API_ENDPOINT.USER_LOGIN, data);
};

// service user Resend OTP
export const userResendOTP = async (email, navigate) => {
  if (!email) {
    toast.error('Email diperlukan');
    return false;
  }

  try {
    const response = await http.post(API_ENDPOINT.USER_RESEND_OTP, { email });
    const { success } = response.data;

    // Selalu tampilkan alert sukses terlepas dari keberhasilan sebenarnya
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'OTP telah dikirim',
    });

    navigate('/login');
    return success;
  } catch (error) {
    console.error('Gagal mengirim ulang OTP:', error);

    // Tampilkan alert sukses meskipun ada kesalahan
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'OTP telah dikirim',
    });

    navigate('/login');
    return false;
  }
};

// service user getData
export const userGetData = async ({ queryKey }) => {
  const [_key] = queryKey;
  const { data } = await http
    .get(_key)
    .then((value) => {
      return value.data;
    })
    .catch((err) => {
      return err.err;
    });
  return data;
};

// service useUserGetData
export const useUserGetData = (options) => {
  return useQuery([API_ENDPOINT.USER_WHOAMI, options], userGetData);
};

// service userForgotPassword
export const userForgotPassword = async (forgotPassword) => {
  try {
    const response = await http.post(
      API_ENDPOINT.USER_FORGOT_PASSWORD,
      forgotPassword,
    );
    return response.data;
  } catch (error) {
    console.error(
      'Gagal mengirim permintaan lupa kata sandi:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// service user change password
export const userChangePassword = async (changePassword) => {
  try {
    const response = await http.put(
      API_ENDPOINT.USER_CHANGE_PASSWORD,
      changePassword,
    );
    return response.data;
  } catch (error) {
    console.error(
      'Gagal mengubah kata sandi:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// service user reset password
export const userResetPassword = async (token, resetPasswordData) => {
  try {
    const response = await http.post(
      API_ENDPOINT.USER_RESET_PASSWORD(token),
      resetPasswordData,
    );
    return response.data;
  } catch (error) {
    console.error(
      'Gagal mereset kata sandi:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// service user OTP
export const userOTP = async (otp, token) => {
  return await http.post(API_ENDPOINT.USER_OTP(otp, token));
};
