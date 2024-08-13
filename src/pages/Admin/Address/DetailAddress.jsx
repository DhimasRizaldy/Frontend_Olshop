import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DetailAddress from '../../../components/Fragments/Admin/Address/DetailAddress.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const DetailAddresses = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Address" />
      <ManageLayouts title="DetailAddress">
        <DetailAddress />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default DetailAddresses;
