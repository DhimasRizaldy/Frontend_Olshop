import FormLogin from "../../components/Fragments/Auth/FormLogin";
import AuthLayouts from "../../layout/AuthLayouts";

const LoginPage = () => {
  return (
    <AuthLayouts type="login">
      <FormLogin />
    </AuthLayouts>
  );
};

export default LoginPage;
