import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import TableOne from '../../../components/Tables/TableOne';
import TableThree from '../../../components/Tables/TableThree';
import TableTwo from '../../../components/Tables/TableTwo';
import DefaultLayout from '../../../layout/DefaultLayout';

const Users = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Users;
