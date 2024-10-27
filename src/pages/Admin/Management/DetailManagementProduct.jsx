import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DetailManagement from '../../../components/Fragments/Admin/Management/DetailManagement.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const DetailManagementProduct = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Manajemen Produk" />
      <ManageLayouts title="detailManagement">
        <DetailManagement />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default DetailManagementProduct;
