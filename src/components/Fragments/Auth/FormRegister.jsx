import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Label from '../../Elements/Input/Labels';
import Input from '../../Elements/Input/Inputs';
import Button from '../../Elements/Button/Index';
import { register } from '../../../services/auth/user/services-register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const FormRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // handle register
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the inputs
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Harap isi semua kolom dengan lengkap');
      return;
    }

    // Validate password length
    if (password.length < 8 || password.length > 30) {
      toast.error('Kata sandi harus terdiri dari 8 hingga 30 karakter');
      return;
    }

    // Validate password characters (alphanumeric only)
    const passwordRegex = /^[a-zA-Z0-9]{8,30}$/;
    if (!passwordRegex.test(password)) {
      toast.error('Kata sandi hanya boleh berisi karakter alfanumerik');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Kata sandi tidak cocok');
      return;
    }

    // Create user data
    const userData = {
      username,
      email,
      password,
      confirmPassword,
    };

    try {
      // Send data to backend with setIsLoading passed as an argument
      await register(userData, setIsLoading);

      // Clear form fields on success
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Add a 5-second delay before redirecting to the login page
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.err) {
        if (err.response.data.err === 'Email sudah terdaftar') {
          toast.error('Email sudah terdaftar');
        } else if (err.response.data.err === 'Username sudah terdaftar') {
          toast.error('Username sudah terdaftar');
        } else {
          toast.error(err.response.data.err);
        }
      } else {
        toast.error(err.err);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="mb-4">
          <Label classname="mb-2.5 block font-medium text-black dark:text-white">
            Nama Pengguna
          </Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Masukkan nama pengguna Anda"
              classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <span className="absolute right-4 top-4">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                    fill=""
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>
        {/* email */}
        <div className="mb-4">
          <Label classname="mb-2.5 block font-medium text-black dark:text-white">
            Email
          </Label>
          <div className="relative">
            <Input
              type="email"
              placeholder="Masukkan email Anda"
              classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <span className="absolute right-4 top-4">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                    fill=""
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>
        {/* password */}
        <div className="mb-4">
          <Label classname="mb-2.5 block font-medium text-black dark:text-white">
            Kata Sandi
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan kata sandi Anda"
              classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <span
              className="absolute right-4 top-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        {/* confirmationpassword */}
        <div className="mb-4">
          <Label classname="mb-2.5 block font-medium text-black dark:text-white">
            Konfirmasi Kata Sandi
          </Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Konfirmasi kata sandi Anda"
              classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            <span
              className="absolute right-4 top-4 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </span>
          </div>
        </div>
        {/* button login */}
        <div className="mb-5">
          <Button
            type="submit"
            classname="w-full p-4 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
            disabled={isLoading}
          >
            {isLoading ? 'Mendaftar...' : 'Daftar'}
          </Button>
        </div>
        <div className="mt-6 text-center">
          <p className="font-medium">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-primary">
              Masuk
            </Link>
          </p>
        </div>
      </form>
      {/* Button Home */}
      <div className="mb-4 mt-10">
        <Button classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90">
          <Link to={'/'}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            <span>Beranda</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FormRegister;
