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

// CRUD Rating
import Rating from './pages/Admin/Rating/Rating';
import AddRatings from './pages/Admin/Rating/AddRating.jsx';
import EditRatings from './pages/Admin/Rating/EditRating.jsx';
import DetailRatings from './pages/Admin/Rating/DetailRating.jsx';

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
import AddTransactions from './pages/Admin/Transaction/AddTransaction.jsx';
import EditTransactions from './pages/Admin/Transaction/EditTransaction.jsx';
import DetailTransactions from './pages/Admin/Transaction/DetailTransaction.jsx';

// CRUD Promo
import Promo from './pages/Admin/Promo/Promo';
import AddPromos from './pages/Admin/Promo/AddPromo.jsx';
import EditPromos from './pages/Admin/Promo/EditPromo.jsx';
import DetailPromos from './pages/Admin/Promo/DetailPromo.jsx';

// CRUD Product
import Product from './pages/Admin/Product/Product';
import AddProducts from './pages/Admin/Product/AddProduct.jsx';
import EditProducts from './pages/Admin/Product/EditProduct.jsx';
import DetailProducts from './pages/Admin/Product/DetailProduct.jsx';

// CRUD Supplier
import Supplier from './pages/Admin/Supplier/Supplier';
import AddSuppliers from './pages/Admin/Supplier/AddSupplier.jsx';
import EditSuppliers from './pages/Admin/Supplier/EditSupplier.jsx';
import DetailSuppliers from './pages/Admin/Supplier/DetailSupplier.jsx';

// CRUD Address
import Address from './pages/Admin/Address/Address';
import AddAddress from './pages/Admin/Address/AddAddress.jsx';
import EditAddress from './pages/Admin/Address/EditAddress.jsx';
import DataAddress from './pages/Admin/Address/DataAddress.jsx';
import DetailAddress from './pages/Admin/Address/DetailAddress.jsx';
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
          path="/edit-users/:userId"
          element={
            <>
              <PageTitle title="Edit Users | Putra Komputer" />
              <EditUsers />
            </>
          }
        />
        <Route
          path="/detail-users/:userId"
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
          path="/edit-management/:manageStockId"
          element={
            <>
              <PageTitle title="Edit Management Product | Putra Komputer" />
              <EditManagementProduct />
            </>
          }
        />
        <Route
          path="/detail-management/:manageStockId"
          element={
            <>
              <PageTitle title="Detail Management Product | Putra Komputer" />
              <DetailManagementProduct />
            </>
          }
        />

        {/* Admin Supplier */}
        <Route
          path="/supplier"
          element={
            <>
              <PageTitle title="Supplier | Putra Komputer" />
              <Supplier />
            </>
          }
        />
        <Route
          path="/add-supplier"
          element={
            <>
              <PageTitle title="Add Supplier | Putra Komputer" />
              <AddSuppliers />
            </>
          }
        />
        <Route
          path="/edit-supplier/:supplierId"
          element={
            <>
              <PageTitle title="Edit Supplier | Putra Komputer" />
              <EditSuppliers />
            </>
          }
        />
        <Route
          path="/detail-supplier/:supplierId"
          element={
            <>
              <PageTitle title="Detail Supplier | Putra Komputer" />
              <DetailSuppliers />
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
          path="/edit-category/:categoryId"
          element={
            <>
              <PageTitle title="Edit Category | Putra Komputer" />
              <EditCategorys />
            </>
          }
        />
        <Route
          path="/detail-category/:categoryId"
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
        <Route
          path="/add-product"
          element={
            <>
              <PageTitle title="Add Product | Putra Komputer" />
              <AddProducts />
            </>
          }
        />
        <Route
          path="/edit-product"
          element={
            <>
              <PageTitle title="Edit Product | Putra Komputer" />
              <EditProducts />
            </>
          }
        />
        <Route
          path="/detail-product"
          element={
            <>
              <PageTitle title="Detail Product | Putra Komputer" />
              <DetailProducts />
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
        <Route
          path="/add-promo"
          element={
            <>
              <PageTitle title="Add Promo | Putra Komputer" />
              <AddPromos />
            </>
          }
        />
        <Route
          path="/edit-promo/:promoId"
          element={
            <>
              <PageTitle title="Edit Promo | Putra Komputer" />
              <EditPromos />
            </>
          }
        />
        <Route
          path="/detail-promo/:promoId"
          element={
            <>
              <PageTitle title="Detail Promo | Putra Komputer" />
              <DetailPromos />
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
        <Route
          path="/add-transaction"
          element={
            <>
              <PageTitle title="Add Transaction | Putra Komputer" />
              <AddTransactions />
            </>
          }
        />
        <Route
          path="/edit-transaction"
          element={
            <>
              <PageTitle title="Edit Transaction | Putra Komputer" />
              <EditTransactions />
            </>
          }
        />
        <Route
          path="/detail-transaction"
          element={
            <>
              <PageTitle title="Detail Transaction | Putra Komputer" />
              <DetailTransactions />
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
        <Route
          path="/add-rating"
          element={
            <>
              <PageTitle title="Add Rating | Putra Komputer" />
              <AddRatings />
            </>
          }
        />
        <Route
          path="/edit-rating"
          element={
            <>
              <PageTitle title="Edit Rating | Putra Komputer" />
              <EditRatings />
            </>
          }
        />
        <Route
          path="/detail-rating"
          element={
            <>
              <PageTitle title="Detail Rating | Putra Komputer" />
              <DetailRatings />
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
              <PageTitle title="Edit Profile | Putra Komputer" />
              <DataProfile />
            </>
          }
        />

        {/* address */}
        <Route
          path="/address"
          element={
            <>
              <PageTitle title="Address | Putra Komputer" />
              <Address />
            </>
          }
        />
        <Route
          path="/add-address"
          element={
            <>
              <PageTitle title="Add Address | Putra Komputer" />
              <AddAddress />
            </>
          }
        />
        <Route
          path="/edit-address/:addressId"
          element={
            <>
              <PageTitle title="Edit Address | Putra Komputer" />
              <EditAddress />
            </>
          }
        />
        <Route
          path="/detail-address/:addressId"
          element={
            <>
              <PageTitle title="Detail Address | Putra Komputer" />
              <DetailAddress />
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
