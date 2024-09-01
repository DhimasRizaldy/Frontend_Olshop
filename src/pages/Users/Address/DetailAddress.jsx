import DetailAddress from '../../../components/Fragments/Admin/Address/DetailAddress.jsx';
import UserLayouts from '../../../layout/UserLayouts.jsx';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const DetailAddressUsers = () => {
  return (
    <UserLayouts>
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
        <ManageLayouts title="DetailAddress">
          <DetailAddress />
        </ManageLayouts>
      </div>
    </UserLayouts>
  );
};

export default DetailAddressUsers;
