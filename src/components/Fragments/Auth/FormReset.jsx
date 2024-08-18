import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Label from '../../Elements/Input/Labels';
import Input from '../../Elements/Input/Inputs';
import Button from '../../Elements/Button/Index';
import { userResetPassword } from '../../../services/auth/user/userAuthServices';
import Swal from 'sweetalert2';

const FormReset = () => {
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get token from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tokenValue = urlParams.get('token');
    if (tokenValue) {
      setToken(tokenValue);
    }
  }, [location.search]);

  // Handle form submit
  const handleResetPassword = async (e) => {
    e.preventDefault();

    console.log('password:', password);
    console.log('confirmPassword:', confirmPassword);

    if (password !== confirmPassword) {
      toast.error('Password does not match');
      return;
    }

    setIsLoading(true);

    try {
      const resetPasswordData = {
        password,
        confirmPassword,
      };
      await userResetPassword(token, resetPasswordData);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password reset successfully',
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/login'); // Redirect after success
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <ToastContainer />
      {/* Password */}
      <div className="mb-4">
        <Label classname="mb-2.5 block font-medium text-black dark:text-white">
          Password
        </Label>
        <div className="relative">
          <Input
            type="password"
            placeholder="Enter your new password"
            classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
      </div>
      {/* Confirm Password */}
      <div className="mb-4">
        <Label classname="mb-2.5 block font-medium text-black dark:text-white">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            type="password"
            placeholder="Enter your confirm password"
            classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
      </div>
      {/* Change Password Button */}
      <div className="mb-5">
        <Button
          type="submit"
          classname="w-full p-4 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </div>
    </form>
  );
};

export default FormReset;
