import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import EditCategory from '../../../components/Fragments/Admin/Category/EditCategory.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const EditCategorys = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ubah Kategori" />
      <ManageLayouts title="editCategory">
        <EditCategory />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default EditCategorys;
