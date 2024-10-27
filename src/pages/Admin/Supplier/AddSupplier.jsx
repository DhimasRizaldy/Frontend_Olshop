import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddSupplier from '../../../components/Fragments/Admin/Supplier/AddSupplier.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const AddSuppliers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tambah Suplier" />
      <ManageLayouts title="AddSupplier">
        <AddSupplier />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default AddSuppliers;
