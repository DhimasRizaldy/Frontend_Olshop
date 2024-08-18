import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataAddress from '../../../components/Fragments/Admin/Address/DataAddress.jsx';
import Button from '../../../components/Elements/Button/Index.jsx';
import DefaultLayout from '../../../layout/DefaultLayout.js';
import { Link } from 'react-router-dom';

const Adrress = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Address" />

      <div className="mb-5">
        <Link to="/add-address">
          <Button
            type="submit"
            classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          >
            Add Data
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-10">
        <DataAddress />
      </div>
    </DefaultLayout>
  );
};

export default Adrress;