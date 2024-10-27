import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import EditTransaction from '../../../components/Fragments/Admin/Transaction/EditTransaction.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const EditTransactions = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ubah Transaksi" />
      <ManageLayouts title="editTransaction">
        <EditTransaction />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default EditTransactions;
