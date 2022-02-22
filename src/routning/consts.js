export const MenuItemsPathNames = {
  personalArea: '/personal-area',
  deposit: '/deposit',
  withdrawalNewRequest: '/withdrawal/new-request',
  withdrawalOpenRequest: '/withdrawal/open-requests',
  withdrawalRequestHistory: '/withdrawal/requests-history',
  personalData: '/personal-data/personal-data',
  security: '/personal-data/security',
  accountStatus: '/account-status',
  promoOffers: '/promo-offers',
  documents: '/documents',
  kyc: '/kyc',
  logout: '/logout',
};

export const PathNamesByCondition = {
  completeRegistration: '/complete-registration',
  economicProfile: '/economic-profile',
  appropriatenessTest: '/appropriateness-test',
  requiredDocuments: '/required-documents',
  depositresult: '/depositresult',
  onboarding: '/onboarding',
  blockingReason: '/blocking-reason',
  addAccount: '/add-account',
};

export const UnauthorizedPathNames = {
  login: '/login',
  resetPassword: '/reset-password',
  forgotPassword: '/forgot-password',
  registration: '/registration',
  confirmEmail: '/confirm-email',
};

export const PathNamesWithSubPath = {
  withdrawalRoute: '/withdrawal',
  personalDataRoute: '/personal-data',
};

// TODO remove this const, implement auto-redirect logic for /withdrawal and /personal-data
export const AvailablePathNames = {
  ...MenuItemsPathNames,
  ...PathNamesByCondition,
  ...UnauthorizedPathNames,
};

export const PathNames = {
  ...MenuItemsPathNames,
  ...PathNamesWithSubPath,
  ...PathNamesByCondition,
  ...UnauthorizedPathNames,
};

export const TabNames = {
  logout: 'logout',
  signout: 'sign-out',
};
