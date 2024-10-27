import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddProduct from '../../../components/Fragments/Admin/Product/AddProduct.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const AddProducts = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tambah Produk" />
      <ManageLayouts title="addProduct">
        <AddProduct />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default AddProducts;
