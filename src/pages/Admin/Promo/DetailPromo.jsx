import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DetailPromo from '../../../components/Fragments/Admin/Promo/DetailPromo.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const DetailPromos = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Promo" />
      <ManageLayouts title="detailPromo">
        <DetailPromo />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default DetailPromos;
