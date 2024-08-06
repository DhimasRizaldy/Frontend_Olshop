import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DetailCategory from '../../../components/Fragments/Admin/Category/DetailCategory.jsx';
import DefaultLayout from '../../../layout/DefaultLayout';
import ManageLayouts from '../../../layout/ManageLayouts.jsx';

const DetailCategorys = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Category" />
      <ManageLayouts title="detailCategory">
        <DetailCategory />
      </ManageLayouts>
    </DefaultLayout>
  );
};

export default DetailCategorys;
