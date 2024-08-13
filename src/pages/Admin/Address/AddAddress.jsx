import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddAddress from '../../../components/Fragments/Admin/Address/AddAddress.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const AddAddresses = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Address" />
      <ManageLayouts title="AddAddress">
        <AddAddress />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default AddAddresses;
