import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import NotificationsMe from '../../../components/Fragments/Admin/Notification/Notifications';

const NotificationAdmin = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notifications" />
      <div className="bg-white shadow-md rounded-lg p-6">
        <NotificationsMe />
      </div>
    </DefaultLayout>
  );
};

export default NotificationAdmin;
