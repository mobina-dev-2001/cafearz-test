import type { SelectChangeEvent } from '@mui/material/Select';
import type {
  Control,
  FieldErrors,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';

import { z } from 'zod';

export const replyFormSchema = z.object({
  response: z
    .string()
    .min(1, 'متن پاسخ الزامی است')
    .max(1000, 'متن پاسخ نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد'),
  attachments: z
    .array(z.instanceof(File))
    .max(5, 'حداکثر ۵ فایل مجاز است')
    .refine(
      (files) => files.every((file) => file.size <= 10 * 1024 * 1024),
      'حجم هر فایل باید کمتر از ۱۰MB باشد'
    )
    .refine(
      (files) =>
        files.every(
          (file) =>
            [
              'image/jpeg',
              'image/png',
              'application/pdf',
              'application/zip',
              'application/x-rar-compressed',
              'application/x-zip-compressed',
              'application/octet-stream',
            ].includes(file.type) ||
            file.name.endsWith('.zip') ||
            file.name.endsWith('.rar')
        ),
      'فقط فایل‌های JPEG, PNG, PDF, ZIP و RAR مجاز هستند'
    )
    .optional(),
  isConfidential: z.boolean().default(false),
});

export type ReplyFormValues = {
  response: string;
  isConfidential: boolean;
  attachments?: File[];
};

export type SelectChangeHandler = (event: SelectChangeEvent) => void;

export type ReplyFormProps = {
  onSubmit: (data: ReplyFormValues) => Promise<void> | void;
  control: Control<ReplyFormValues, any, ReplyFormValues>;
  errors: FieldErrors<ReplyFormValues>;
  setValue: UseFormSetValue<ReplyFormValues>;
  reset: UseFormReset<ReplyFormValues>;
};
