import FormRegister from "../../components/Fragments/Auth/FormRegister";
import AuthLayouts from "../../layout/AuthLayouts";

const RegisterPage = () => {
  return (
    <AuthLayouts type="register">
      <FormRegister />
    </AuthLayouts>
  );
};

export default RegisterPage;
