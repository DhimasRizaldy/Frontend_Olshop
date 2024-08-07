import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import EditTransaction from '../../../components/Fragments/Admin/Transaction/EditTransaction.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const EditTransactions = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Transaction" />
      <ManageLayouts title="EditTransaction">
        <EditTransaction />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default EditTransactions;
