import EditAddress from '../../../components/Fragments/Admin/Address/EditAddress.jsx';
import UserLayouts from '../../../layout/UserLayouts';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const EditAddressUsers = () => {
  return (
    <UserLayouts>
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
        <ManageLayouts title="EditAddress">
          <EditAddress />
        </ManageLayouts>
      </div>
    </UserLayouts>
  );
};

export default EditAddressUsers;
