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
  // User Auth (Admin)
  USER_REGISTER_ADMIN: '/auth/register-admin',
  GET_ALL_USER: '/auth/users',

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
  DELETE_CATEGORY: (categoryId) => {
    return `/category/${categoryId}`;
  },

  // Supplier
  GET_SUPPLIER: '/supplier',
  GET_DETAIL_SUPPLIER: (supplierId) => {
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
  GET_DETAIL_PROMO: (promoId) => {
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
  GET_DETAIL_ADDRESS: (addressId) => {
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

  // ManageStok
  GET_MANAGE_STOK: '/manageStok/',
  GET_DETAIL_MANAGE_STOK: (manageStokId) => {
    return `/manageStok/${manageStokId}`;
  },
  POST_MANAGE_STOK: '/manageStok/',
  UPDATE_MANAGE_STOK: (manageStokId) => {
    return `/manageStok/${manageStokId}`;
  },
  DELETE_MANAGE_STOK: (manageStokId) => {
    return `/manageStok/${manageStokId}`;
  },

  // Transaction
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
};
