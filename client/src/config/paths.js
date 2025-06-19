export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    // dashboard: {
    //   path: '',
    //   getHref: () => '/app',
    // },
    // users: {
    //   path: 'users',
    //   getHref: () => '/app/users',
    // },
    // profile: {
    //   path: 'profile',
    //   getHref: () => '/app/profile',
    // },
  },
};
