const ROOTS = {
  DASHBOARD: '/dashboard',
};

export const paths = {
  dashboard: {
    root: ROOTS.DASHBOARD,
  },
  tickets: {
    root: `${ROOTS.DASHBOARD}/tickets`,
    new: `${ROOTS.DASHBOARD}/tickets/new`,
    list: `${ROOTS.DASHBOARD}/tickets/list`,
    show: (id: string | number) => `${ROOTS.DASHBOARD}/tickets/show/${id}`,
  },
};
