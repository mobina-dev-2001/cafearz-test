import type { TicketItem } from 'src/api/types';

import { Box, Stack, Select, Divider, MenuItem, InputLabel, FormControl, type SelectChangeEvent } from '@mui/material';

import { STATUS_OPTIONS, PRIORITY_OPTIONS, DEPARTMENT_OPTIONS } from '../tickets-config';

import type { SelectChangeHandler } from './types';

interface TicketInfoCardProps {
  ticket: TicketItem;
  onStatusChange: SelectChangeHandler;
  onPriorityChange: SelectChangeHandler;
  onDepartmentChange: (event: SelectChangeEvent<number>) => void;
}

export const TicketInfoCard = ({
  ticket,
  onStatusChange,
  onPriorityChange,
  onDepartmentChange,
}: TicketInfoCardProps) => (
  <Box sx={{ padding: 2, paddingTop: 0 }}>
    <Divider />
    <Box sx={{ mt: 2 }}>
      <Stack direction="row" gap={0.75}>
        <FormControl fullWidth>
          <InputLabel id="ticket-status-label">وضعیت</InputLabel>
          <Select
            labelId="ticket-status-label"
            value={ticket.status.key}
            label="وضعیت"
            onChange={onStatusChange}
          >
            {STATUS_OPTIONS.filter((option) => option.value !== 'ALL').map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="ticket-priority-label">اهمیت</InputLabel>
          <Select
            labelId="ticket-priority-label"
            value={ticket.priority.key}
            label="اهمیت"
            onChange={onPriorityChange}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="ticket-department-label">دپارتمان</InputLabel>
          <Select
            labelId="ticket-department-label"
            value={ticket.fk_department.key}
            label="دپارتمان"
            onChange={onDepartmentChange}
          >
            {DEPARTMENT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={Number(option.value)}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  </Box>
);
