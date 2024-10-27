import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DetailSupplier from '../../../components/Fragments/Admin/Supplier/DetailSupplier.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const DetailSuppliers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Suplier" />
      <ManageLayouts title="detailSupplier">
        <DetailSupplier />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default DetailSuppliers;
