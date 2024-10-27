import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataCategory from '../../../components/Fragments/Admin/Category/DataCategory.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import Button from '../../../components/Elements/Button/Index.jsx';
import { Link } from 'react-router-dom';

const Category = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Kategori" />

      <div className="mb-5">
        <Link to="/add-category">
          <Button
            type="submit"
            classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          >
            Tambah Data
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-10">
        <DataCategory />
      </div>
    </DefaultLayout>
  );
};

export default Category;
