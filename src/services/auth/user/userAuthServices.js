import { toast } from 'react-toastify';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import http from '../../../utils/constants/http';
import { useMutation, useQuery } from '@tanstack/react-query';

// service user login
export const userLogin = async (data) => {
  return await http.post(API_ENDPOINT.USER_LOGIN, data);
};

// service user Resend OTP
export const userResendOTP = async (data) => {
  return await http.post(API_ENDPOINT.USER_RESEND_OTP, data);
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

// service changePassword
export const userChangePassword = async (data) => {
  return await http
    .put(API_ENDPOINT.USER_CHANGE_PASSWORD, data)
    .then((result) => {
      toast(result.data.message, {
        position: 'top-right',
        className: 'toast-success',
      });
    })
    .catch((err) => {
      toast(err.response.data.error, {
        position: 'top-right',
        className: 'toast-error',
      });
      return false;
    });
};

// service useUserChangePassword
export const useUserChangePassword = () => {
  return useMutation(userChangePassword);
};

// service userForgotPassword
export const userForgotPassword = async (data) => {
  return await http.post(API_ENDPOINT.USER_FORGOT_PASSWORD, data);
};

// service userResetPassword
export const userResetPassword = async (token, data) => {
  return await http.post(API_ENDPOINT.USER_RESET_PASSWORD(token), data);
};

// service user OTP
export const userOTP = async (otp, token) => {
  return await http.post(API_ENDPOINT.USER_OTP(otp, token));
};
