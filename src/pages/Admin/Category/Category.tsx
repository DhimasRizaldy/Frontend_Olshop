import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb.js';
import DataCategory from '../../../components/Fragments/Admin/Category/DataCategory.jsx';
import DefaultLayout from '../../../layout/DefaultLayout.js';
import Button from '../../../components/Elements/Button/Index.jsx';

const Category = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category" />

      <div className="mb-5">
        <Button
          type="submit"
          classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
        >
          Add Data
        </Button>
      </div>

      <div className="flex flex-col gap-10">
        <DataCategory />
      </div>
    </DefaultLayout>
  );
};

export default Category;
