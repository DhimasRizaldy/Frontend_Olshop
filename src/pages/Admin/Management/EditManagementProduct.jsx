import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import EditManagement from '../../../components/Fragments/Admin/Management/EditManagement.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const EditManagementProduct = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Management Product" />
      <ManageLayouts title="editProduct">
        <EditManagement />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default EditManagementProduct;
