import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../Elements/Button/Index';
import { userOTP } from '../../../services/auth/user/userAuthServices';


const FormVerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // url
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenValue = urlParams.get('token');
    const otpValue = urlParams.get('otp');

    if (tokenValue && otpValue) {
      setToken(tokenValue);
      setOtp(otpValue);
    }
  }, [location.search]);

  const handleOTP = async () => {
    const success = await userOTP(otp, token);
    Swal.fire({
      icon: success ? 'success' : 'error',
      title: success ? 'Success' : 'Failed',
      text: success ? 'OTP has been verified' : 'Failed to verify OTP',
    });

    setIsLoading(false);

    if (success) {
      navigate('/login');
    }
  };

  return (
    <form>
      {/* button activate */}
      <div className="mb-5">
        <Button
          onClick={handleOTP}
          classname="w-full p-4 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
        >
          Verify Accounts
        </Button>
      </div>
    </form>
  );
};

export default FormVerifyOtp;
