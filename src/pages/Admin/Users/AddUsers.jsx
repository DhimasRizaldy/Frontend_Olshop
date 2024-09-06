import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddUser from '../../../components/Fragments/Admin/Users/AddUser.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const AddUsers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Admin" />
      <ManageLayouts title="addUsers">
        <AddUser />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default AddUsers;
