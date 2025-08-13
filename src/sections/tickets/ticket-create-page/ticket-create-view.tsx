import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';

import { Box, Card, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useFullTickets } from 'src/api/api';
import { DashboardContent } from 'src/layout/dashboard';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { FormInputs } from './form-inputs';
import { FileUpload } from '../file-upload';
import { FormActions } from './form-actions';
import { DEPARTMENT_OPTIONS } from '../tickets-config';

import type { FormValues } from './types';

export default function TicketCreateView() {
  const { data, isLoading } = useFullTickets();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; blob: Blob; id: string }[]>(
    []
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      title: '',
      user: '',
      department: DEPARTMENT_OPTIONS[0]?.value || 2,
      priority: 'MEDIUM',
      tag: '',
      description: '',
      files: [],
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  const handleReset = () => {
    reset();
    setSelectedFiles([]);
  };

  const onSubmit = async (formData: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      enqueueSnackbar('تیکت با موفقیت ایجاد شد', { variant: 'success' });
      handleReset();
    } catch (error) {
      console.error('Error creating ticket:', error);
      enqueueSnackbar('خطا در ایجاد تیکت', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const userOptions = useMemo(
    () =>
      data?.tickets.data.map((obj) => ({
        id: obj.user.fk_user_id,
        name: obj.user.name,
        mobile: obj.user.mobile,
      })) || [],
    [data]
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="افزودن تیکت جدید"
        links={[
          { name: 'داشبورد', href: paths.dashboard.root },
          { name: 'لیست تیکت ها', href: paths.tickets.list },
          { name: 'افزودن تیکت جدید' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card sx={{ p: 3.5 }}>
        <Typography variant="body1" sx={{ marginBlockEnd: 3.5 }}>
          فرم ثبت تیکت
        </Typography>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <FormInputs
                control={control}
                errors={errors}
                userOptions={userOptions}
                isLoading={isLoading}
              />

              <Controller
                name="files"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FileUpload
                    value={selectedFiles.map((f) => new File([f.blob], f.name))}
                    onChange={(newFiles) => {
                      const newFileObjects = newFiles.map((file) => ({
                        name: file.name,
                        blob: file,
                        id: Math.random().toString(36).substring(2, 9),
                      }));
                      setSelectedFiles(newFileObjects);
                      setValue('files', newFiles, { shouldValidate: true });
                    }}
                    error={error?.message}
                    sx={{ gridColumn: 'span 3' }}
                  />
                )}
              />
            </Box>

            <FormActions isSubmitting={isSubmitting} onReset={handleReset} />
          </form>
        </FormProvider>
      </Card>
    </DashboardContent>
  );
}
