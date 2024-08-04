import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataManagement from '../../../components/Fragments/Admin/Management/DataManagement.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import Button from '../../../components/Elements/Button/Index.jsx';

const ManagementProduct = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Management Product" />

      <div className="mb-5">
        <Button
          type="submit"
          classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
        >
          Add Data
        </Button>
      </div>

      <div className="flex flex-col gap-10">
        <DataManagement />
      </div>
    </DefaultLayout>
  );
};

export default ManagementProduct;
