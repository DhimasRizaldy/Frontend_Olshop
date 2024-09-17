import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Label from '../../Elements/Input/Labels';
import Input from '../../Elements/Input/Inputs';
import Button from '../../Elements/Button/Index';
import { handleLogin } from '../../../services/auth/admin/services-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoginGoogle from './LoginGoogle';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    await handleLogin(email, password, navigate, setIsLoading);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <ToastContainer />
        <div className="mb-4">
          <Label classname="mb-2.5 block font-medium text-black dark:text-white">
            Email
          </Label>
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email"
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
        <div className="mb-6">
          <Label classname="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="relative">
            <div className="mt-5 text-right">
              <p className="font-medium text-primary">
                <Link to="/forgot-password">Forgot Password</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <Button
            type="submit"
            classname="w-full p-4 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </div>
        <LoginGoogle navigate={navigate} setIsLoading={setIsLoading} />
        <div className="mt-5 text-center">
          <p className="font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </p>
        </div>
        <div className="mt-5 text-center">
          <p className="font-medium">
            Don't activate account?{' '}
            <Link to="/verify-accounts" className="text-primary">
              Activate Account
            </Link>
          </p>
        </div>
      </form>
      <div className="mb-4 mt-10">
        <Button classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90">
          <Link to={'/'}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            <span>Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FormLogin;
