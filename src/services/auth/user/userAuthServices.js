import { toast } from "react-toastify";
import { API_ENDPOINT } from "../../../utils/constants/endpoint";
import http from "../../../utils/constants/http";
import { useMutation, useQuery } from "@tanstack/react-query";

module.exports = {
  // service user login
  userLogin: async (data) => {
    return await http.post(API_ENDPOINT.USER_LOGIN, data);
  },

  // service user register
  userRegister: async (data) => {
    return await http.post(API_ENDPOINT.USER_REGISTER, data);
  },

  // service user OTP
  userOTP: async (otp, token) => {
    return await http.post(API_ENDPOINT.USER_OTP(otp, token));
  },

  // service user Resend OTP
  userResendOTP: async (data) => {
    return await http.post(API_ENDPOINT.USER_RESEND_OTP, data);
  },

  // service user getData
  userGetData: async ({ queryKey }) => {
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
  },

  // service useUserGetData
  useUserGetData: (options) => {
    return useQuery([API_ENDPOINT.USER_WHOAMI, options], userGetData);
  },

  // service changePassword
  userChangePassword: async (data) => {
    return await http
      .put(API_ENDPOINT.USER_CHANGE_PASSWORD, data)
      .then((result) => {
        toast(result.data.message, {
          position: "top-right",
          className: "toast-success",
        });
      })
      .catch((err) => {
        toast(err.response.data.error, {
          position: "top-right",
          className: "toast-error",
        });
        return false;
      });
  },

  // service useUserChangePassword
  useUserChangePassword: () => {
    return useMutation(userChangePassword);
  },

  // service userForgotPassword
  userForgotPassword: async (data) => {
    return await http.post(API_ENDPOINT.USER_FORGOT_PASSWORD, data);
  },

  // service userResetPassword
  userResetPassword: async (token, data) => {
    return await http.post(API_ENDPOINT.USER_RESET_PASSWORD(token), data);
  },
};
