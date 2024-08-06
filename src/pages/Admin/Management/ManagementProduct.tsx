import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataManagement from '../../../components/Fragments/Admin/Management/DataManagement.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import Button from '../../../components/Elements/Button/Index.jsx';
import { Link } from 'react-router-dom';

const ManagementProduct = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Management Product" />

      <div className="mb-5">
        <Link to="/add-management">
          <Button
            type="submit"
            classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          >
            Add Data
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-10">
        <DataManagement />
      </div>
    </DefaultLayout>
  );
};

export default ManagementProduct;
