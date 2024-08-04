import FormActivate from "../../components/Fragments/Auth/FormActivate";
import AuthLayouts from "../../layout/AuthLayouts";

const ActivateAccountPage = () => {
  return (
    <AuthLayouts type="verify-email">
      <FormActivate />
    </AuthLayouts>
  );
};

export default ActivateAccountPage;
