import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DetailUser from '../../../components/Fragments/Admin/Users/DetailUser.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const DetailUsers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Pengguna" />
      <ManageLayouts title="detailUsers">
        <DetailUser />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default DetailUsers;
