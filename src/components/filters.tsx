import type { ReactNode } from 'react';
import type { Theme, SxProps } from '@mui/material/styles';

import { Box, Button } from '@mui/material';

import { Iconify } from 'src/components/iconify/iconify';

interface FiltersBlockProps {
  label: string;
  children: ReactNode;
  isShow: boolean;
  sx?: SxProps<Theme>;
}

interface FiltersResultProps {
  onReset: () => void;
  sx?: SxProps<Theme>;
  children: ReactNode;
}

export function FiltersBlock({ label, children, isShow, sx }: FiltersBlockProps) {
  if (!isShow) {
    return null;
  }

  return (
    <Box
      gap={0.375}
      display="flex"
      sx={{
        py: 0.438,
        px: 0.5,
        borderRadius: 0.625,
        overflow: 'hidden',
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        ...sx,
      }}
    >
      <Box
        component="span"
        sx={{
          lineHeight: '24px',
          fontSize: (theme) => theme.typography.body2.fontSize,
          fontWeight: (theme) => theme.typography.body2.fontWeight,
        }}
      >
        {label}
      </Box>
      <Box gap={1} display="flex" flexWrap="wrap">
        {children}
      </Box>
    </Box>
  );
}

export function FiltersResult({ onReset, sx, children }: FiltersResultProps) {
  return (
    <Box sx={sx}>
      <Box flexGrow={1} gap={1} display="flex" flexWrap="wrap" alignItems="center">
        {children}

        <Button
          color="error"
          onClick={onReset}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          پاک کردن همه
        </Button>
      </Box>
    </Box>
  );
}
