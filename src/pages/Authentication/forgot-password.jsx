import FormForgot from '../../components/Fragments/Auth/FormForgot';
import AuthLayouts from '../../layout/AuthLayouts';

const ForgotPage = () => {
  return (
    <AuthLayouts type="forgot-password">
      <FormForgot />
    </AuthLayouts>
  );
};

export default ForgotPage;
