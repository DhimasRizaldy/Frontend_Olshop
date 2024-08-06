import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import EditUser from '../../../components/Fragments/Admin/Users/EditUser.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const EditUsers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Users" />
      <ManageLayouts title="editUsers">
        <EditUser />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default EditUsers;
