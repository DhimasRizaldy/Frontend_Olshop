import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddCategory from '../../../components/Fragments/Admin/Category/AddCategory.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const AddCategorys = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tambah Kategori" />
      <ManageLayouts title="addCategory">
        <AddCategory />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default AddCategorys;
