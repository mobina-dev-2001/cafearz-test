export type FormValues = {
  title: string;
  user: string;
  department: number;
  priority: 'UP' | 'MEDIUM' | 'LOW';
  tag: string;
  description: string;
  files: Blob[];
};

export type UserOption = {
  id: string | number;
  name: string;
  mobile: string;
};
