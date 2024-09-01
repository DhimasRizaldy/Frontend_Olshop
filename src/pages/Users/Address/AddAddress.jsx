import AddAddress from '../../../components/Fragments/Admin/Address/AddAddress.jsx';
import UserLayouts from '../../../layout/UserLayouts';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const AddAddressUsers = () => {
  return (
    <UserLayouts>
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
        <ManageLayouts title="AddAddress">
          <AddAddress />
        </ManageLayouts>
      </div>
    </UserLayouts>
  );
};

export default AddAddressUsers;
