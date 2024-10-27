import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataTransaction from '../../../components/Fragments/Admin/Transaction/DataTransaction.jsx';
import Button from '../../../components/Elements/Button/Index.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Link } from 'react-router-dom';

const Transaction = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Transaksi" />

      <div className="flex flex-col gap-10">
        <DataTransaction />
      </div>
    </DefaultLayout>
  );
};

export default Transaction;
