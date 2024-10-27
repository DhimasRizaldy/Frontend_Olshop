import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import EditProduct from '../../../components/Fragments/Admin/Product/EditProduct.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const EditProducts = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ubah Produk" />
      <ManageLayouts title="editProduct">
        <EditProduct />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default EditProducts;
