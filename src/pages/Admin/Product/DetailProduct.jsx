import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DetailProduct from '../../../components/Fragments/Admin/Product/DetailProduct.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';

const DetailProducts = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Product" />
      <DetailProduct />
    </DefaultLayout>
  );
};

export default DetailProducts;
