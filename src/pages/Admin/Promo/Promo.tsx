import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataPromo from '../../../components/Fragments/Admin/Promo/DataPromo.jsx';
import Button from '../../../components/Elements/Button/Index.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Link } from 'react-router-dom';

const Promo = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Promo" />

      <div className="mb-5">
        <Link to="/add-promo">
          <Button
            type="submit"
            classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          >
            Add Data
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-10">
        <DataPromo />
      </div>
    </DefaultLayout>
  );
};

export default Promo;
