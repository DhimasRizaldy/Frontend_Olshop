import FormLoginAdmin from '../../components/Fragments/Auth/FormLoginAdmin';
import AuthLayouts from '../../layout/AuthLayouts';

const LoginPageAdmin = () => {
  return (
    <AuthLayouts type="login-admin">
      <FormLoginAdmin />
    </AuthLayouts>
  );
};

export default LoginPageAdmin;
