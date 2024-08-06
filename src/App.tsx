import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Chart from './pages/Chart';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';

// Auth
import LoginPage from './pages/Authentication/login.jsx';
import RegisterPage from './pages/Authentication/register.jsx';
import ActivateAccountPage from './pages/Authentication/activate-accounts.jsx';
import ChangePage from './pages/Authentication/change-password.jsx';
import ForgotPage from './pages/Authentication/forgot-password.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage404.jsx';

// Admin
import ECommerce from './pages/Admin/Dashboard/ECommerce';
import DataProfile from './components/Fragments/Admin/Profile/DataProfile.jsx';
import Rating from './pages/Admin/Rating/Rating';

// CRUD Management Product
import ManagementProduct from './pages/Admin/Management/ManagementProduct';
import AddManagementProduct from './pages/Admin/Management/AddManagementProduct.jsx';
import EditManagementProduct from './pages/Admin/Management/EditManagementProduct.jsx';
import DetailManagementProduct from './pages/Admin/Management/DetailManagementProduct.jsx';

// CRUD Users
import Users from './pages/Admin/Users/Users';
import AddUsers from './pages/Admin/Users/AddUsers.jsx';
import EditUsers from './pages/Admin/Users/EditUsers.jsx';
import DetailUsers from './pages/Admin/Users/DetailUsers.jsx';

// CRUD Category
import Category from './pages/Admin/Category/Category.jsx';
import AddCategorys from './pages/Admin/Category/AddCategory.jsx';
import EditCategorys from './pages/Admin/Category/EditCategory.jsx';
import DetailCategorys from './pages/Admin/Category/DetailCategory.jsx';

// CRUD Transaction
import Transaction from './pages/Admin/Transaction/Transaction';

// CRUD Promo
import Promo from './pages/Admin/Promo/Promo';

// CRUD Product
import Product from './pages/Admin/Product/Product';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | Putra Komputer" />
              <ECommerce />
            </>
          }
        />

        {/* Admin Users */}
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users | Putra Komputer" />
              <Users />
            </>
          }
        />
        <Route
          path="/add-users"
          element={
            <>
              <PageTitle title="Add Users | Putra Komputer" />
              <AddUsers />
            </>
          }
        />
        <Route
          path="/edit-users"
          element={
            <>
              <PageTitle title="Edit Users | Putra Komputer" />
              <EditUsers />
            </>
          }
        />
        <Route
          path="/detail-users"
          element={
            <>
              <PageTitle title="Detail Users | Putra Komputer" />
              <DetailUsers />
            </>
          }
        />

        {/* Admin Managemen Product */}
        <Route
          path="/management"
          element={
            <>
              <PageTitle title="Management Product | Putra Komputer" />
              <ManagementProduct />
            </>
          }
        />
        <Route
          path="/add-management"
          element={
            <>
              <PageTitle title="Add Management Product | Putra Komputer" />
              <AddManagementProduct />
            </>
          }
        />
        <Route
          path="/edit-management"
          element={
            <>
              <PageTitle title="Edit Management Product | Putra Komputer" />
              <EditManagementProduct />
            </>
          }
        />
        <Route
          path="/detail-management"
          element={
            <>
              <PageTitle title="Detail Management Product | Putra Komputer" />
              <DetailManagementProduct />
            </>
          }
        />

        {/* Admin Category */}
        <Route
          path="/category"
          element={
            <>
              <PageTitle title="Category | Putra Komputer" />
              <Category />
            </>
          }
        />
        <Route
          path="/add-category"
          element={
            <>
              <PageTitle title="Add Category | Putra Komputer" />
              <AddCategorys />
            </>
          }
        />
        <Route
          path="/edit-category"
          element={
            <>
              <PageTitle title="Edit Category | Putra Komputer" />
              <EditCategorys />
            </>
          }
        />
        <Route
          path="/detail-category"
          element={
            <>
              <PageTitle title="Detail Category | Putra Komputer" />
              <DetailCategorys />
            </>
          }
        />

        {/* Admin Product */}
        <Route
          path="/product"
          element={
            <>
              <PageTitle title="Product | Putra Komputer" />
              <Product />
            </>
          }
        />

        {/* Admin Promo */}
        <Route
          path="/promo"
          element={
            <>
              <PageTitle title="Promo | Putra Komputer" />
              <Promo />
            </>
          }
        />

        {/* Admin Transaction */}
        <Route
          path="/transaction"
          element={
            <>
              <PageTitle title="Transaction | Putra Komputer" />
              <Transaction />
            </>
          }
        />

        {/* Admin Rating */}
        <Route
          path="/rating"
          element={
            <>
              <PageTitle title="Rating | Putra Komputer" />
              <Rating />
            </>
          }
        />

        {/* Admin Profile */}
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Putra Komputer" />
              <DataProfile />
            </>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <>
              <PageTitle title="Profile | Putra Komputer" />
              <DataProfile />
            </>
          }
        />

        {/* Admin Settings */}
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Putra Komputer" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Putra Komputer" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Putra Komputer" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Putra Komputer" />
              <Buttons />
            </>
          }
        />

        {/* Auth Route */}
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Login | Putra Komputer" />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <PageTitle title="Register | Putra Komputer" />
              <RegisterPage />
            </>
          }
        />
        <Route
          path="/verify-accounts"
          element={
            <>
              <PageTitle title="Activate Accounts | Putra Komputer" />
              <ActivateAccountPage />
            </>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <>
              <PageTitle title="Forgot Password | Putra Komputer" />
              <ForgotPage />
            </>
          }
        />
        <Route
          path="/change-password"
          element={
            <>
              <PageTitle title="Change Password | Putra Komputer" />
              <ChangePage />
            </>
          }
        />
        <Route
          path="/logout"
          element={
            <>
              <PageTitle title="Logout | Putra Komputer" />
              <LoginPage />
            </>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
