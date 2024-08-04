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
import Users from './pages/Admin/Users/Users';
import ManagementProduct from './pages/Admin/Management/ManagementProduct';
import Category from './pages/Admin/Category/Category.js';
import Product from './pages/Admin/Product/Product';
import Promo from './pages/Admin/Promo/Promo';
import Transaction from './pages/Admin/Transaction/Transaction';
import Rating from './pages/Admin/Rating/Rating';

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
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | Putra Komputer" />
              <ECommerce />
            </>
          }
        />
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
          path="/management"
          element={
            <>
              <PageTitle title="Management Product | Putra Komputer" />
              <ManagementProduct />
            </>
          }
        />
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
          path="/product"
          element={
            <>
              <PageTitle title="Product | Putra Komputer" />
              <Product />
            </>
          }
        />
        <Route
          path="/promo"
          element={
            <>
              <PageTitle title="Promo | Putra Komputer" />
              <Promo />
            </>
          }
        />
        <Route
          path="/transaction"
          element={
            <>
              <PageTitle title="Transaction | Putra Komputer" />
              <Transaction />
            </>
          }
        />
        <Route
          path="/rating"
          element={
            <>
              <PageTitle title="Rating | Putra Komputer" />
              <Rating />
            </>
          }
        />
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
