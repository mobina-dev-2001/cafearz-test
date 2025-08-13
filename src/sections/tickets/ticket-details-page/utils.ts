import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { ReplyFormValues } from './types';

const replySchema = z.object({
  response: z.string().min(1, 'متن پاسخ الزامیست'),
  isConfidential: z.boolean().default(false),
  attachments: z.array(z.instanceof(File)).max(5).optional(),
});

export function useReplyForm() {
  return useForm<ReplyFormValues, any, ReplyFormValues>({
    resolver: zodResolver(replySchema) as any,
    defaultValues: {
      response: '',
      isConfidential: false,
      attachments: [],
    },
    mode: 'onSubmit',
  });
}
