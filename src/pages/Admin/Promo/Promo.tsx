import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataPromo from '../../../components/Fragments/Admin/Promo/DataPromo.jsx';
import Button from '../../../components/Elements/Button/Index.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';

const Promo = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Promo" />

      <div className="mb-5">
        <Button
          type="submit"
          classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
        >
          Add Data
        </Button>
      </div>

      <div className="flex flex-col gap-10">
        <DataPromo />
      </div>
    </DefaultLayout>
  );
};

export default Promo;
