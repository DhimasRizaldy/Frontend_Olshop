import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddManagement from '../../../components/Fragments/Admin/Management/AddManagement.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const AddManagementProduct = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Management Product" />
      <ManageLayouts title="addProduct">
        <AddManagement />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default AddManagementProduct;
