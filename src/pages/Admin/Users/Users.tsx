import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DataUser from '../../../components/Fragments/Admin/Users/DataUser.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import Button from '../../../components/Elements/Button/Index.jsx';
import { Link } from 'react-router-dom';

const Users = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />

      <div className="mb-5">
        <Link to="/add-users">
          <Button
            type="submit"
            classname="p-3 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          >
            Add Data
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        <DataUser />
      </div>
    </DefaultLayout>
  );
};

export default Users;
