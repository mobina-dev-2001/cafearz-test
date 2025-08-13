export const STATUS_OPTIONS = [
  { value: 'ALL', label: 'همه تیکت ها' },
  { value: 'NOANSWER', label: 'بدون پاسخ' },
  { value: 'PENDING', label: 'در حال بررسی' },
  { value: 'ANSWERED', label: 'پاسخ داده شده' },
  { value: 'RESOLVED', label: 'حل شده' },
  { value: 'WAITING_ANSWER', label: 'در انتظار پاسخ' },
];

export const PRIORITY_OPTIONS = [
  { value: 'UP', label: 'بالا' },
  { value: 'MEDIUM', label: 'متوسط' },
  { value: 'LOW', label: 'پایین' },
];

export const DEPARTMENT_OPTIONS = [
  { value: 1, label: 'مدیریت' },
  { value: 2, label: 'پشتیبانی' },
  { value: 3, label: 'فروش' },
  { value: 4, label: 'مالی' },
];

export const TABLE_HEAD = [
  { id: 'id', label: 'شناسه' },
  { id: 'user', label: 'مشخصات کاربر' },
  { id: 'fk_department', label: 'دپارتمان' },
  { id: 'title', label: 'عنوان تیکت' },
  { id: 'date', label: 'تاریخ' },
  { id: 'status', label: 'وضعیت' },
  { id: 'action', label: 'عملیات' },
];

export const ROWS_PER_PAGE = 5;
