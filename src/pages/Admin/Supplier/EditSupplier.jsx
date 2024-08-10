import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import EditSupplier from '../../../components/Fragments/Admin/Supplier/EditSupplier.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const EditSuppliers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Supplier" />
      <ManageLayouts title="editSupplier">
        <EditSupplier />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default EditSuppliers;
