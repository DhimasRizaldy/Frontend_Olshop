import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddPromo from '../../../components/Fragments/Admin/Promo/AddPromo.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const AddPromos = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tambah Promo" />
      <ManageLayouts title="addPromo">
        <AddPromo />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default AddPromos;
