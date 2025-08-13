import { useState } from 'react';
import { Controller, type UseFormHandleSubmit } from 'react-hook-form';

import { Stack, Button, Divider, Checkbox, TextField, FormControlLabel } from '@mui/material';

import { FileUpload } from '../file-upload';

import type { ReplyFormProps, ReplyFormValues } from './types';

type ReplyFormPropsWithSubmit = ReplyFormProps & {
  handleSubmit: UseFormHandleSubmit<ReplyFormValues, ReplyFormValues>;
};

export const ReplyForm = ({
  onSubmit,
  control,
  errors,
  setValue,
  reset,
  handleSubmit,
}: ReplyFormPropsWithSubmit) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <form
      onSubmit={handleSubmit((data: ReplyFormValues) => {
        console.log('Form submitted:', data);
        onSubmit(data);
        setFiles([]);
        reset();
      })}
      noValidate
    >
      <Stack gap={2}>
        <Controller
          name="response"
          control={control}
          rules={{ required: 'متن پاسخ الزامیست' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={2.5}
              label="متن تیکت"
              placeholder="یک متن وارد کنید..."
              error={!!error}
              helperText={error?.message}
              slotProps={{
                htmlInput: { 'aria-label': 'متن پاسخ', 'aria-required': 'true' },
              }}
            />
          )}
        />

        <Controller
          name="isConfidential"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label="آیا این پیام محرمانه است؟"
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
            />
          )}
        />

        <Controller
          name="attachments"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FileUpload
              value={files}
              onChange={(newFiles) => {
                setFiles(newFiles);
                setValue('attachments', newFiles, { shouldValidate: true });
              }}
              error={error?.message as string}
            />
          )}
        />
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Button type="submit" variant="contained" sx={{ width: 164 }}>
        ارسال پیام
      </Button>
    </form>
  );
};
