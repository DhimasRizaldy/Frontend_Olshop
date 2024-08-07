import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DetailTransaction from '../../../components/Fragments/Admin/Transaction/DetailTransaction.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const DetailTransactions = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Transaction" />
      <ManageLayouts title="detailTransaction">
        <DetailTransaction />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default DetailTransactions;
