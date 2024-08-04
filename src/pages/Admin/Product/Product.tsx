import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataProduct from '../../../components/Fragments/Admin/Product/DataProduct.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import Button from '../../../components/Elements/Button/Index.jsx';

const Product = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product" />

      <div className="mb-5">
        <Button
          type="submit"
          classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
        >
          Add Data
        </Button>
      </div>

      <div className="flex flex-col gap-10">
        <DataProduct />
      </div>
    </DefaultLayout>
  );
};

export default Product;
