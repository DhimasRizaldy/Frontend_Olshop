import FormVerifyOtp from '../../components/Fragments/Auth/FormVerifyOtp';
import AuthLayouts from '../../layout/AuthLayouts';

const VerifyAccountPage = () => {
  return (
    <AuthLayouts type="verify-accounts">
      <FormVerifyOtp />
    </AuthLayouts>
  );
};

export default VerifyAccountPage;
