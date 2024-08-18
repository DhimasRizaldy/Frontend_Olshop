import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Label from '../../Elements/Input/Labels';
import Input from '../../Elements/Input/Inputs';
import Button from '../../Elements/Button/Index';
import { userChangePassword } from '../../../services/auth/user/userAuthServices';
import Swal from 'sweetalert2';

const FormChange = () => {
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submit
  const handleChangePassword = async (e) => {
    e.preventDefault();

    console.log('old_password:', old_password);
    console.log('new_password:', new_password);
    console.log('confirm_password:', confirm_password);

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

      navigate('/profile'); // contoh redirect setelah sukses, sesuaikan dengan kebutuhan Anda
    } catch (error) {
      toast.error('Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            type="password"
            placeholder="Enter your old password"
            classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={old_password}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="current-password"
          />
          <span className="absolute right-4 top-4">{/* Your SVG icon */}</span>
        </div>
      </div>
      {/* New Password */}
      <div className="mb-4">
        <Label classname="mb-2.5 block font-medium text-black dark:text-white">
          New Password
        </Label>
        <div className="relative">
          <Input
            type="password"
            placeholder="Enter your new password"
            classname="w-full py-4 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={new_password}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <span className="absolute right-4 top-4">{/* Your SVG icon */}</span>
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
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <span className="absolute right-4 top-4">{/* Your SVG icon */}</span>
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
