import { Iconify } from 'src/components/iconify/iconify';

const icon = (
  name:
    | 'uim:calendar'
    | 'uim:chart'
    | 'uim:rocket'
    | 'uim:paypal'
    | 'uim:lock-alt'
    | 'uim:telegram-alt'
) => <Iconify icon={name} width={22} />;

export type NavItem = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
  children?: NavItem[];
  disabled?: boolean;
};

export const navData = [
  {
    title: 'داشبورد',
    path: '/dashboard',
    icon: icon('uim:calendar'),
  },
  {
    title: 'گزارشات',
    path: '/dashboard/reports',
    icon: icon('uim:chart'),
  },
  {
    title: 'سفارشات',
    path: '/dashboard/orders',
    icon: icon('uim:rocket'),
  },
  {
    title: 'نقد درآمد ارزی',
    path: '/dashboard/caching-income',
    icon: icon('uim:paypal'),
  },
  {
    title: 'تایید مدارک',
    path: '/dashboard/verifications',
    icon: icon('uim:lock-alt'),
  },
  {
    title: 'تیکت ها',
    path: '/dashboard/tickets',
    icon: icon('uim:telegram-alt'),
    children: [
      {
        title: 'لیست تیکت ها',
        path: '/dashboard/tickets/list',
      },
      {
        title: 'ثبت تیکت جدید',
        path: '/dashboard/tickets/new',
      },
    ],
  },
];
