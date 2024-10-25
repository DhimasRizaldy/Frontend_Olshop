import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Label from '../../Elements/Input/Labels';
import Input from '../../Elements/Input/Inputs';
import Button from '../../Elements/Button/Index';
import { userResetPassword } from '../../../services/auth/user/userAuthServices';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const FormReset = () => {
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (password !== confirmPassword) {
      toast.error('Kata sandi tidak cocok');
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
        title: 'Berhasil',
        text: 'Kata sandi berhasil direset',
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/login'); // Redirect after success
    } catch (error) {
      toast.error('Gagal mereset kata sandi. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleResetPassword}>
      <ToastContainer />
      {/* Kata Sandi */}
      <div className="mb-4">
        <Label classname="mb-2.5 block font-medium text-black dark:text-white">
          Kata Sandi
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Masukkan kata sandi baru Anda"
            classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <span
            className="absolute right-4 top-4 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
      </div>
      {/* Konfirmasi Kata Sandi */}
      <div className="mb-4">
        <Label classname="mb-2.5 block font-medium text-black dark:text-white">
          Konfirmasi Kata Sandi
        </Label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Masukkan konfirmasi kata sandi Anda"
            classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <span
            className="absolute right-4 top-4 cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
          </span>
        </div>
      </div>
      {/* Tombol Reset Kata Sandi */}
      <div className="mb-5">
        <Button
          type="submit"
          classname="w-full p-4 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          disabled={isLoading}
        >
          {isLoading ? 'Mereset...' : 'Reset Kata Sandi'}
        </Button>
      </div>
    </form>
  );
};

export default FormReset;
