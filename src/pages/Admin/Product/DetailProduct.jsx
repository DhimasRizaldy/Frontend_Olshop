import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DetailProduct from '../../../components/Fragments/Admin/Product/DetailProduct.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const DetailProducts = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Product" />
      <ManageLayouts title="detailProduct">
        <DetailProduct />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default DetailProducts;
