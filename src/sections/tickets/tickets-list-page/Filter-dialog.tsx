import type { Filters } from 'src/api/types';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, Divider, Tooltip, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify/iconify';

interface FilterDialogProps {
  filters: Filters[];
  appliedFilters: Record<string, string>;
  onApplyFilters: (filters: Record<string, string>) => void;
}

export default function FilterDialog({
  filters,
  appliedFilters,
  onApplyFilters,
}: FilterDialogProps) {
  const [open, setOpen] = useState(false);
  const { handleSubmit, reset, register } = useForm<Record<string, string>>({
    defaultValues: appliedFilters,
  });

  useEffect(() => {
    if (open) {
      reset(appliedFilters);
    }
  }, [open, appliedFilters, reset]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data: Record<string, string>) => {
    onApplyFilters(data);
    handleClose();
  };

  const handleReset = () => {
    const resetValues = Object.keys(appliedFilters).reduce(
      (acc, key) => ({ ...acc, [key]: '' }),
      {} as Record<string, string>
    );
    reset(resetValues);
  };

  const renderFilterInput = (filter: Filters) => {
    switch (filter.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            label={filter.label}
            defaultValue={appliedFilters[filter.name] || ''}
            {...register(filter.name)}
          />
        );
      case 'select':
        return (
          <FormControl fullWidth>
            <InputLabel>{filter.label}</InputLabel>
            <Select
              label={filter.label}
              defaultValue={appliedFilters[filter.name] || ''}
              {...register(filter.name)}
            >
              {filter.options.map((option) => (
                <MenuItem key={option._id.toString()} value={option._id}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Tooltip title="فیلتر">
        <IconButton onClick={handleOpen}>
          <Iconify icon="solar:filter-bold" />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        slotProps={{
          backdrop: { sx: { backdropFilter: 'blur(2px)' } },
        }}
      >
        <DialogTitle
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography variant="h5">فیلتر ها</Typography>
          <IconButton onClick={handleClose} size="large">
            <Iconify icon="solar:close-circle-bold" />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1.875,
              }}
            >
              {filters.map((filter) => (
                <Box key={filter.name}>{renderFilterInput(filter)}</Box>
              ))}
            </Box>

            <Divider sx={{ marginBlock: 3.25 }} />

            <DialogActions sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Button type="submit" variant="contained">
                جستجو
              </Button>
              <Button variant="outlined" color="inherit" onClick={handleReset}>
                ریست
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
