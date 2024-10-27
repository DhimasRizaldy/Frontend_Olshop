import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataProduct from '../../../components/Fragments/Admin/Product/DataProduct.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import Button from '../../../components/Elements/Button/Index.jsx';
import { Link } from 'react-router-dom';
const Product = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Produk" />

      <div className="mb-5">
        <Link to="/add-product">
          <Button
            type="submit"
            classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          >
            Tambah Data
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-10">
        <DataProduct />
      </div>
    </DefaultLayout>
  );
};

export default Product;
