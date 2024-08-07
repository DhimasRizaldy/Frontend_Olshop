import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataRating from '../../../components/Fragments/Admin/Rating/DataRating.jsx';
import Button from '../../../components/Elements/Button/Index.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Link } from 'react-router-dom';

const Rating = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rating" />

      <div className="mb-5">
        <Link to="/add-rating">
          <Button
            type="submit"
            classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          >
            Add Data
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-10">
        <DataRating />
      </div>
    </DefaultLayout>
  );
};

export default Rating;
