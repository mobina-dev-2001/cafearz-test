import type { CombinedTicket } from 'src/api/types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify/iconify';

import { getLabelColor } from './utils';
import { UserProfile } from '../user-profile';

interface TicketTableRowProps {
  row: CombinedTicket;
  onView: () => void;
}

export function TicketTableRow({ row, onView }: TicketTableRowProps) {
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>{row.ticket_id}</TableCell>

      <TableCell>
        <UserProfile
          user={{
            name: row.user.name,
            avatar: row.user.avatar,
            legal: row.user.legal,
            verify: row.user.verify,
          }}
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.department}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.title}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Stack spacing={0.75}>
          <Typography variant="body2">
            <Box component="span" sx={{ color: 'text.disabled' }}>
              ثبت:
            </Box>{' '}
            {row.date.created_at.jalali}
          </Typography>
          <Typography variant="body2">
            <Box component="span" sx={{ color: 'text.disabled' }}>
              به روز رسانی:
            </Box>{' '}
            {row.date.updated_at.jalali}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Label color={getLabelColor(row.status.key)}>{row.status.label}</Label>
      </TableCell>

      <TableCell>
        <Tooltip title="مشاهده" placement="top" arrow>
          <IconButton onClick={onView}>
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
