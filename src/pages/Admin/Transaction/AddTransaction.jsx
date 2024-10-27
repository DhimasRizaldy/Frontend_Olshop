import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddTransaction from '../../../components/Fragments/Admin/Transaction/AddTransaction.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const AddTransactions = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tambah Transaksi" />
      <ManageLayouts title="addTransaction">
        <AddTransaction />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default AddTransactions;
