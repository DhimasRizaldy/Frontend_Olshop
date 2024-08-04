import FormReset from "../../components/Fragments/Auth/FormReset";
import AuthLayouts from "../../layout/AuthLayouts";

const ForgotPage = () => {
  return (
    <AuthLayouts type="forgot-password">
      <FormReset />
    </AuthLayouts>
  );
};

export default ForgotPage;
