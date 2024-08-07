import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddRating from '../../../components/Fragments/Admin/Rating/AddRating.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const AddRatings = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Rating" />
      <ManageLayouts title="AddRating">
        <AddRating />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default AddRatings;
