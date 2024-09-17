import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Label from '../../Elements/Input/Labels';
import Input from '../../Elements/Input/Inputs';
import Button from '../../Elements/Button/Index';
import { userChangePassword } from '../../../services/auth/user/userAuthServices';
import Swal from 'sweetalert2';
import { getWHOAMI } from '../../../services/auth/admin/getDataUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const FormChange = () => {
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI();
        setUserRole(response.data.user.role);
      } catch (error) {
        toast.error('Failed to fetch user role');
        console.error('Error:', error);
      }
    };

    fetchUserRole();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (new_password !== confirm_password) {
      toast.error('Password does not match');
      return;
    }

    setIsLoading(true);

    try {
      const changePasswordData = {
        old_password,
        new_password,
        confirm_password,
      };
      await userChangePassword(changePasswordData);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password changed successfully',
        showConfirmButton: false,
        timer: 2000,
      });

      // Redirect based on user role
      if (userRole === 'ADMIN') {
        navigate('/admin/profile');
      } else if (userRole === 'USER') {
        navigate('/users/profile');
      }
    } catch (error) {
      toast.error('Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prevState) => !prevState);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleChangePassword}>
      <ToastContainer />
      {/* Old Password */}
      <div className="mb-4">
        <Label classname="mb-2.5 block font-medium text-black dark:text-white">
          Old Password
        </Label>
        <div className="relative">
          <Input
            type={showOldPassword ? 'text' : 'password'}
            placeholder="Enter your old password"
            classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={old_password}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="current-password"
          />
          <span
            className="absolute right-4 top-4 cursor-pointer"
            onClick={toggleOldPasswordVisibility}
          >
            <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
          </span>
        </div>
      </div>
      {/* New Password */}
      <div className="mb-4">
        <Label classname="mb-2.5 block font-medium text-black dark:text-white">
          New Password
        </Label>
        <div className="relative">
          <Input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Enter your new password"
            classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={new_password}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <span
            className="absolute right-4 top-4 cursor-pointer"
            onClick={toggleNewPasswordVisibility}
          >
            <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
          </span>
        </div>
      </div>
      {/* Confirm Password */}
      <div className="mb-4">
        <Label classname="mb-2.5 block font-medium text-black dark:text-white">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your new password"
            classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={confirm_password}
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
      {/* Change Password Button */}
      <div className="mb-5">
        <Button
          type="submit"
          classname="w-full p-4 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          disabled={isLoading}
        >
          {isLoading ? 'Changing...' : 'Change Password'}
        </Button>
      </div>
    </form>
  );
};

export default FormChange;
