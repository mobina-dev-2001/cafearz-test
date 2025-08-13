import type { Theme, SxProps } from '@mui/material';

import { useRef } from 'react';
import { useSnackbar } from 'notistack';

import { Box, Chip, Grid, Button, Typography, FormHelperText } from '@mui/material';

import { Iconify } from 'src/components/iconify/iconify';

interface FileUploadProps {
  value: File[];
  onChange: (files: File[]) => void;
  error?: string;
  maxFiles?: number;
  maxSize?: number;
  accept?: string[];
  sx?: SxProps<Theme>;
}

export const FileUpload = ({
  value: files = [],
  onChange,
  error,
  maxFiles = 5,
  maxSize = 10,
  accept = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/zip',
    'application/x-zip-compressed',
    'application/vnd.rar',
    'application/x-rar-compressed',
  ],
  sx,
}: FileUploadProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;
    const validated: File[] = [];

    for (const file of selected) {
      const isValidType =
        accept.includes(file.type) ||
        file.name.toLowerCase().endsWith('.zip') ||
        file.name.toLowerCase().endsWith('.rar');

      if (!isValidType) {
        enqueueSnackbar(
          `فایل منتخب دارای فرمت نامعتبر است. فقط فایل‌های ${accept.join(', ')} مجاز هستند`,
          { variant: 'error' }
        );
        continue;
      }

      const isValidSize = file.size <= maxSize * 1024 * 1024;
      if (!isValidSize) {
        enqueueSnackbar(`حجم فایل بیش از ${maxSize} مگابایت است`, { variant: 'error' });
        continue;
      }
      validated.push(file);
    }

    if (!validated.length) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const updatedFiles = [...files, ...validated].slice(0, maxFiles);
    onChange(updatedFiles);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onChange(updatedFiles);
  };

  const getFileIcon = (fileName: string) => {
    const name = fileName.toLowerCase();
    if (name.endsWith('.pdf')) return 'solar:file-text-bold-duotone';
    if (name.endsWith('.zip')) return 'solar:zip-file-bold-duotone';
    if (name.endsWith('.rar')) return 'solar:winrar-bold-duotone';
    if (name.match(/\.(jpg|jpeg|png)$/i)) return 'solar:gallery-bold-duotone';
    return 'solar:file-bold-duotone';
  };

  return (
    <Box sx={sx}>
      <Button
        component="label"
        variant="outlined"
        size="small"
        color="inherit"
        sx={{ width: 'max-content' }}
        startIcon={<Iconify icon="material-symbols:attach-file" />}
        disabled={files.length >= maxFiles}
      >
        افزودن فایل
        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept={accept.join(',')}
          onChange={handleFileChange}
          multiple
        />
      </Button>

      {files.length > 0 && (
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {files.map((file, index) => (
            <Chip
              key={index}
              label={
                <Box display="flex" alignItems="center" gap={0.75}>
                  <Iconify icon={getFileIcon(file.name)} />
                  <Typography variant="body2" noWrap>
                    {file.name}
                  </Typography>
                  <Typography variant="caption">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                </Box>
              }
              onDelete={() => removeFile(index)}
              variant="outlined"
              sx={{ maxWidth: 'max-content', borderRadius: 1 }}
            />
          ))}
        </Grid>
      )}

      {error && (
        <FormHelperText error sx={{ mt: 1 }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
};
