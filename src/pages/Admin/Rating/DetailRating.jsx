import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DetailRating from '../../../components/Fragments/Admin/Rating/DetailRating.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const DetailRatings = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Rating" />
      <ManageLayouts title="detailRating">
        <DetailRating />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default DetailRatings;
