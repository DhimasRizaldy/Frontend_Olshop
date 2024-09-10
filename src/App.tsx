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
import VerifyAccountsPage from './pages/Authentication/verify-accounts.jsx';
import ResetPage from './pages/Authentication/reset-password.jsx';
// import ErrorPage from './pages/ErrorPage/ErrorPage404.jsx';

// Admin
import ECommerce from './pages/Admin/Dashboard/ECommerce';
import DataProfileAdmin from './components/Fragments/Admin/Profile/DataProfileAdmin.jsx';

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
import DetailAddress from './pages/Admin/Address/DetailAddress.jsx';

// Home User
import Home from './pages/Users/Home/Home.jsx';
import ProductsFilter from './pages/Users/Product/ProductFilter.jsx';
import VocPromo from './pages/Users/VcPromo/VocPromo.jsx';
import Transactions from './pages/Users/Transaksi/Transactions.jsx';
import Notifications from './pages/Users/Notifications/Notifications.jsx';
import DetailsNotifications from './pages/Users/Notifications/DetailNotifications.jsx';
import Carts from './pages/Users/Carts/Carts.jsx';
import ProductsDetail from './pages/Users/Product/ProductDetail.jsx';
import ProductCategory from './pages/Users/Product/ProductCategory.jsx';
import DataProfileUsers from './components/Fragments/Users/Profile/DataProfileUsers.jsx';
import Payments from './pages/Users/Transaksi/Payment.jsx';
import DetailTransactionMes from './pages/Users/Transaksi/DetailTransactionMe.jsx';
import PaymentSuccess from './pages/Users/Transaksi/PaymentSuccess.jsx';
import PaymentCancel from './pages/Users/Transaksi/PaymentCancel.jsx';

// CRUD Address Users
import AddAddressUsers from './pages/Users/Address/AddAddress.jsx';
import EditAddressUsers from './pages/Users/Address/EditAddress.jsx';
import DetailAddressUsers from './pages/Users/Address/DetailAddress.jsx';

// Notification
import DetailNotificationAdmin from './pages/Admin/Notifications/DetailNotifications.jsx';
import NotificationAdmin from './pages/Admin/Notifications/Notifications.jsx';

// Service User
import About from './pages/Users/Service/AboutUs.jsx';
import PrivacyPolicy from './pages/Users/Service/PrivacyPolicy.jsx';
import TermConditions from './pages/Users/Service/TermConditions.jsx';
import ContactUs from './pages/Users/Service/ContactUs.jsx';
import Faqs from './pages/Users/Service/Faqs.jsx';
import OrderTracking from './pages/Users/Service/OrderTracking.jsx';

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
          path="/edit-product/:productId"
          element={
            <>
              <PageTitle title="Edit Product | Putra Komputer" />
              <EditProducts />
            </>
          }
        />
        <Route
          path="/detail-product/:productId"
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
          path="/edit-transaction/:transactionId"
          element={
            <>
              <PageTitle title="Edit Transaction | Putra Komputer" />
              <EditTransactions />
            </>
          }
        />
        <Route
          path="/detail-transaction/:transactionId"
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
          path="/admin/profile"
          element={
            <>
              <PageTitle title="Profile | Putra Komputer" />
              <DataProfileAdmin />
            </>
          }
        />
        <Route
          path="/admin/edit-profile"
          element={
            <>
              <PageTitle title="Edit Profile | Putra Komputer" />
              <DataProfileAdmin />
            </>
          }
        />
        {/* Users Profile */}
        <Route
          path="/users/profile"
          element={
            <>
              <PageTitle title="Profile | Putra Komputer" />
              <DataProfileUsers />
            </>
          }
        />
        <Route
          path="/users/edit-profile"
          element={
            <>
              <PageTitle title="Edit Profile | Putra Komputer" />
              <DataProfileUsers />
            </>
          }
        />

        {/* address admin */}
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
          path="/admin/add-address"
          element={
            <>
              <PageTitle title="Add Address | Putra Komputer" />
              <AddAddress />
            </>
          }
        />
        <Route
          path="/admin/edit-address/:addressId"
          element={
            <>
              <PageTitle title="Edit Address | Putra Komputer" />
              <EditAddress />
            </>
          }
        />
        <Route
          path="/admin/detail-address/:addressId"
          element={
            <>
              <PageTitle title="Detail Address | Putra Komputer" />
              <DetailAddress />
            </>
          }
        />

        {/* address admin */}
        <Route
          path="/users/add-address"
          element={
            <>
              <PageTitle title="Add Address | Putra Komputer" />
              <AddAddressUsers />
            </>
          }
        />
        <Route
          path="/users/edit-address/:addressId"
          element={
            <>
              <PageTitle title="Edit Address | Putra Komputer" />
              <EditAddressUsers />
            </>
          }
        />
        <Route
          path="/users/detail-address/:addressId"
          element={
            <>
              <PageTitle title="Detail Address | Putra Komputer" />
              <DetailAddressUsers />
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
          path="/verify-otp"
          element={
            <>
              <PageTitle title="Verify Accounts | Putra Komputer" />
              <VerifyAccountsPage />
            </>
          }
        />
        <Route
          path="/reset-password"
          element={
            <>
              <PageTitle title="Reset Password | Putra Komputer" />
              <ResetPage />
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
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Home | Putra Komputer" />
              <Home />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <PageTitle title="Products | Putra Komputer" />
              <ProductsFilter />
            </>
          }
        />
        <Route
          path="/products-category/:categoryId"
          element={
            <>
              <PageTitle title="Products Category | Putra Komputer" />
              <ProductCategory />
            </>
          }
        />

        <Route
          path="/details-products/:productId"
          element={
            <>
              <PageTitle title="Products Detail | Putra Komputer" />
              <ProductsDetail />
            </>
          }
        />
        <Route
          path="/promo-voucher"
          element={
            <>
              <PageTitle title="Promo Voucher | Putra Komputer" />
              <VocPromo />
            </>
          }
        />
        <Route
          path="/transaction-me"
          element={
            <>
              <PageTitle title="Transactions | Putra Komputer" />
              <Transactions />
            </>
          }
        />
        <Route
          path="/transaction-me/:transactionId"
          element={
            <>
              <PageTitle title="Transactions Detail | Putra Komputer" />
              <DetailTransactionMes />
            </>
          }
        />
        <Route
          path="/notification-me"
          element={
            <>
              <PageTitle title="Notifications | Putra Komputer" />
              <Notifications />
            </>
          }
        />
        <Route
          path="/notification-me/:notificationId"
          element={
            <>
              <PageTitle title="Notifications Detail | Putra Komputer" />
              <DetailsNotifications />
            </>
          }
        />
        <Route
          path="/notification-all"
          element={
            <>
              <PageTitle title="Notifications | Putra Komputer" />
              <NotificationAdmin />
            </>
          }
        />
        <Route
          path="/notification-all/:notificationId"
          element={
            <>
              <PageTitle title="Notifications Detail | Putra Komputer" />
              <DetailNotificationAdmin />
            </>
          }
        />
        <Route
          path="/carts"
          element={
            <>
              <PageTitle title="Carts | Putra Komputer" />
              <Carts />
            </>
          }
        />
        {/* Payment me*/}
        <Route
          path="/payment-me"
          element={
            <>
              <PageTitle title="Payment | Putra Komputer" />
              <Payments />
            </>
          }
        />
        {/* notification success pay */}
        <Route
          path="/payment-success"
          element={
            <>
              <PageTitle title="Payment Success | Putra Komputer" />
              <PaymentSuccess />
            </>
          }
        />
        {/* notification cancel pay */}
        <Route
          path="/payment-cancel"
          element={
            <>
              <PageTitle title="Payment Cancel | Putra Komputer" />
              <PaymentCancel />
            </>
          }
        />
        <Route
          path="/about-us"
          element={
            <>
              <PageTitle title="About Us | Putra Komputer" />
              <About />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <PageTitle title="Privacy Policy | Putra Komputer" />
              <PrivacyPolicy />
            </>
          }
        />
        <Route
          path="/term-conditions"
          element={
            <>
              <PageTitle title="Term & Conditions | Putra Komputer" />
              <TermConditions />
            </>
          }
        />
        <Route
          path="/contact-us"
          element={
            <>
              <PageTitle title="Contact Us | Putra Komputer" />
              <ContactUs />
            </>
          }
        />
        <Route
          path="/faqs"
          element={
            <>
              <PageTitle title="FAQs | Putra Komputer" />
              <Faqs />
            </>
          }
        />
        <Route
          path="/order-tracking"
          element={
            <>
              <PageTitle title="Order Tracking | Putra Komputer" />
              <OrderTracking />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
