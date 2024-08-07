import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import EditRating from '../../../components/Fragments/Admin/Rating/EditRating.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const EditRatings = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Rating" />
      <ManageLayouts title="EditRating">
        <EditRating />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default EditRatings;
