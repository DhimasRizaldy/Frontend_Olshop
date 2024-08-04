import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataTransaction from '../../../components/Fragments/Admin/Transaction/DataTransaction.jsx';
import Button from '../../../components/Elements/Button/Index.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';

const Transaction = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Transaction" />

      <div className="mb-5">
        <Button
          type="submit"
          classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
        >
          Add Data
        </Button>
      </div>

      <div className="flex flex-col gap-10">
        <DataTransaction />
      </div>
    </DefaultLayout>
  );
};

export default Transaction;
