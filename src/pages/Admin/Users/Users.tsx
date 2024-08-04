import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataUser from '../../../components/Fragments/Admin/Users/DataUsers.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import Button from '../../../components/Elements/Button/Index.jsx';

const Users = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />

      <div className="mb-5">
        <Button
          type="submit"
          classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
        >
          Add Data
        </Button>
      </div>
      <div className="flex flex-col gap-10">
        <DataUser />
      </div>
    </DefaultLayout>
  );
};

export default Users;
