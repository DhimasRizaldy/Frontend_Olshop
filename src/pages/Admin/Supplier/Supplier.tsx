import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataSupplier from '../../../components/Fragments/Admin/Supplier/DataSupplier.jsx';
import Button from '../../../components/Elements/Button/Index.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Link } from 'react-router-dom';

const Supplier = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Suplier" />

      <div className="mb-5">
        <Link to="/add-supplier">
          <Button
            type="submit"
            classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          >
            Tambah Data
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-10">
        <DataSupplier />
      </div>
    </DefaultLayout>
  );
};

export default Supplier;
