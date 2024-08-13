import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import EditAddress from '../../../components/Fragments/Admin/Address/EditAddress.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const EditAddresses = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Address" />
      <ManageLayouts title="EditAddress">
        <EditAddress />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default EditAddresses;
