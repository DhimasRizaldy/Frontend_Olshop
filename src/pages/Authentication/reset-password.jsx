import FormReset from '../../components/Fragments/Auth/FormReset';
import AuthLayouts from '../../layout/AuthLayouts';

const ResetPage = () => {
  return (
    <AuthLayouts type="reset-password">
      <FormReset />
    </AuthLayouts>
  );
};

export default ResetPage;
