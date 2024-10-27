import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import EditPromo from '../../../components/Fragments/Admin/Promo/EditPromo.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const EditPromos = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ubah Promo" />
      <ManageLayouts title="editPromo">
        <EditPromo />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default EditPromos;
