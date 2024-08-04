import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Users from './pages/Users';
import ManagementProduct from './pages/ManagementProduct';
import Category from './pages/Castegory';
import Product from './pages/Product';
import Promo from './pages/Promo';
import Transaction from './pages/Transaction';
import Rating from './pages/Rating';

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
          path='/dashboard'
          element={
            <>
              <PageTitle title=" Dashboard | Putra Komputer" />
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
              <Profile/>
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
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Putra Komputer" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Putra Komputer" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
