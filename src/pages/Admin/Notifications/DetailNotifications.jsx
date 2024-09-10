import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DetailNotifications from '../../../components/Fragments/Admin/Notification/DetailNotifications';
import DefaultLayout from '../../../layout/DefaultLayout';

const DetailNotificationAdmin = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Notification" />
      <DetailNotifications />
    </DefaultLayout>
  );
};

export default DetailNotificationAdmin;
