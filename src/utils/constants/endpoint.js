export const API_ENDPOINT = {
  // User Auth
  USER_WHOAMI: '/auth/whoami',
  USER_LOGIN: '/auth/login',
  USER_LOGIN_GOOGLE: '/auth/google',
  USER_REGISTER: '/auth/register',
  USER_LOGOUT: 'user/logout',
  USER_RESEND_OTP: '/auth/resend-otp',
  USER_OTP: (otp, token) => {
    return `/auth/verifyOTP?otp=${otp}&token=${token}`;
  },
  USER_CHANGE_PASSWORD: '/auth/change-password',
  USER_FORGOT_PASSWORD: '/auth/forgot-password',
  USER_RESET_PASSWORD: '/auth/reset-password',

  // User Auth (Admin)
  REGISTER_ADMIN: '/auth/register-admin',
  GET_ALL_USER: '/auth/users',
  DELETE_ADMIN: (userId) => {
    return `/auth/users/${userId}`;
  },
  UPDATE_ADMIN: (userId) => {
    return `/auth/users/${userId}`;
  },
  GET_ADMIN_BY_ID: (userId) => {
    return `/auth/users/${userId}`;
  },

  // User Auth (Manage Users)
  USER_FORGOT_PASSWORD: '/auth/forgot-password',
  USER_RESET_PASSWORD: (token) => {
    return `/auth/reset-password?token=${token}`;
  },
  USER_CHANGE_PASSWORD: '/auth/change-password',
  USER_ACTIVATE_ACCOUNTS: '/auth/activate-accounts',

  // Profile
  GET_PROFILE: '/profile/',
  UPDATE_PROFILE: '/profile/',

  // Product
  GET_PRODUCT: '/product/',
  GET_DETAIL_PRODUCT: (productId) => {
    return `/product/${productId}`;
  },
  // Product (Admin)
  POST_PRODUCT: '/product/',
  UPDATE_PRODUCT: (productId) => {
    return `/product/${productId}`;
  },
  DELETE_PRODUCT: (productId) => {
    return `/product/${productId}`;
  },

  // category
  GET_CATEGORY: '/category',

  // Category (Admin)
  POST_CATEGORY: '/category/',
  UPDATE_CATEGORY: (categoryId) => {
    return `/category/${categoryId}`;
  },
  GET_CATEGORY_BY_ID: (categoryId) => {
    return `/category/${categoryId}`;
  },
  DELETE_CATEGORY: (categoryId) => {
    return `/category/${categoryId}`;
  },

  // Supplier
  GET_SUPPLIER: '/supplier',
  GET_SUPPLIER_BY_ID: (supplierId) => {
    return `/supplier/${supplierId}`;
  },
  POST_SUPPLIER: '/supplier/',
  UPDATE_SUPPLIER: (supplierId) => {
    return `/supplier/${supplierId}`;
  },
  DELETE_SUPPLIER: (supplierId) => {
    return `/supplier/${supplierId}`;
  },

  // Promo
  GET_PROMO: '/promo',
  GET_PROMO_BY_ID: (promoId) => {
    return `/promo/${promoId}`;
  },
  POST_PROMO: '/promo/',
  UPDATE_PROMO: (promoId) => {
    return `/promo/${promoId}`;
  },
  DELETE_PROMO: (promoId) => {
    return `/promo/${promoId}`;
  },

  // Address
  GET_ADDRESS: '/address/',
  GET_ADDRESS_BY_ID: (addressId) => {
    return `/address/${addressId}`;
  },
  POST_ADDRESS: '/address/',
  UPDATE_ADDRESS: (addressId) => {
    return `/address/${addressId}`;
  },
  DELETE_ADDRESS: (addressId) => {
    return `/address/${addressId}`;
  },

  // Carts
  GET_CARTS: '/carts/',
  GET_DETAIL_CARTS: (cartId) => {
    return `/carts/${cartId}`;
  },
  POST_CARTS: '/carts/',
  UPDATE_CARTS: (cartId) => {
    return `/carts/${cartId}`;
  },
  DELETE_CARTS: (cartId) => {
    return `/carts/${cartId}`;
  },

  // Notification
  GET_NOTIFICATION: '/notification/all',
  GET_ALL_NOTIFICATION: '/notification/',
  UPDATE_NOTIFICATION: (notificationId) => {
    return `/notification/${notificationId}`;
  },
  DELETE_NOTIFICATION: (notificationId) => {
    return `/notification/${notificationId}`;
  },
  GET_NOTIFICATION_BY_ID: (notificationId) => {
    return `/notification/${notificationId}`;
  },

  // ManageStok
  GET_MANAGE_STOK: '/manageStok/',
  GET_MANAGE_STOK_BY_ID: (manageStockId) => {
    return `/manageStok/${manageStockId}`;
  },
  POST_MANAGE_STOK: '/manageStok',
  UPDATE_MANAGE_STOK: (manageStockId) => {
    return `/manageStok/${manageStockId}`;
  },
  DELETE_MANAGE_STOK: (manageStockId) => {
    return `/manageStok/${manageStockId}`;
  },

  // Transaction
  GET_TRANSACTION_ME: '/transaction/me',
  GET_TRANSACTION: '/transaction/',
  GET_DETAIL_TRANSACTION: (transactionId) => {
    return `/transaction/${transactionId}`;
  },
  POST_TRANSACTION: '/transaction/',
  UPDATE_TRANSACTION: (transactionId) => {
    return `/transaction/${transactionId}`;
  },
  DELETE_TRANSACTION: (transactionId) => {
    return `/transaction/${transactionId}`;
  },

  // Payment
  CHECKOUT_PAYMENT: '/payment/checkout',
  CHECKOUT_PAYMENT_NOTIFICATION: '/payment/notification',

  // Ratings
  GET_RATINGS: '/ratings/',
  GET_DETAIL_RATINGS: (ratingsId) => {
    return `/ratings/${ratingsId}`;
  },
  POST_RATINGS: '/ratings/',
  UPDATE_RATINGS: (ratingsId) => {
    return `/ratings/${ratingsId}`;
  },
  DELETE_RATINGS: (ratingsId) => {
    return `/ratings/${ratingsId}`;
  },

  // raja ongkir
  GET_PROVINSI: '/rajaongkir/provinsi',
  GET_CITY: (provId) => {
    return `/rajaongkir/kota/:${provId}`;
  },
  GET_COST: (asal, tujuan, berat, kurir) => {
    return `/rajaongkir/ongkos/:${asal}/:${tujuan}/:${berat}/:${kurir}`;
  },
};


