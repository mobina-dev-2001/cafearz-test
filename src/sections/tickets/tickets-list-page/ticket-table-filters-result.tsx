import type { Theme, SxProps } from '@mui/material';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { FiltersBlock, FiltersResult } from 'src/components/filters';

interface TicketTableFiltersResultProps {
  filters?: {
    state?: Record<string, string>;
    setState?: (filters: Record<string, string>) => void;
    resetState?: () => void;
  };
  onResetPage: () => void;
  sx?: SxProps<Theme>;
}

const FILTER_LABELS: Record<string, string> = {
  status: 'وضعیت',
  fk_department_id: 'دپارتمان',
  ip_address: 'IP',
  content: 'متن',
  national_code: 'کدملی',
  email: 'ایمیل',
  mobile: 'موبایل',
  name: 'نام و نام خانوادگی',
  fk_user_id: 'شناسه کاربر',
  ticket_id: 'شماره تیکت',
};

export function TicketTableFiltersResult({
  filters = {},
  onResetPage,
  sx,
}: TicketTableFiltersResultProps) {
  const { state = {}, setState, resetState } = filters;

  const handleRemoveFilter = useCallback(
    (filterName: string) => {
      onResetPage();
      setState?.({ ...state, [filterName]: '' });
    },
    [setState, onResetPage, state]
  );

  const handleReset = useCallback(() => {
    onResetPage();
    resetState?.();
  }, [resetState, onResetPage]);

  const activeFilters = Object.entries(state).filter(([_, value]) => value);

  if (activeFilters.length === 0) return null;

  return (
    <FiltersResult onReset={handleReset} sx={sx}>
      {activeFilters.map(([key, value]) => (
        <FiltersBlock key={key} label={`${FILTER_LABELS[key] || key}:`} isShow={!!value}>
          <Chip
            size="small"
            label={value}
            onDelete={() => handleRemoveFilter(key)}
            sx={{
              gap: 0.625,
              px: 0.438,
              borderRadius: 0.313,
              '& .MuiSvgIcon-root': { color: 'text.secondary' },
            }}
          />
        </FiltersBlock>
      ))}
    </FiltersResult>
  );
}
