import { Box, Button } from '@mui/material';

import { Iconify } from 'src/components/iconify/iconify';

interface FormActionsProps {
  isSubmitting: boolean;
  onReset: () => void;
}

export const FormActions = ({ isSubmitting, onReset }: FormActionsProps) => (
  <Box
    sx={{
      display: 'flex',
      gap: 1,
      mt: 3,
    }}
  >
    <Button
      variant="contained"
      color="success"
      type="submit"
      disabled={isSubmitting}
      endIcon={isSubmitting ? <Iconify icon="eos-icons:bubble-loading" /> : undefined}
    >
      {isSubmitting ? 'در حال ارسال...' : 'ارسال تیکت'}
    </Button>
    <Button variant="outlined" color='inherit' onClick={onReset} disabled={isSubmitting}>
      ریست
    </Button>
  </Box>
);
