import type { TicketItem } from 'src/api/types';

import { Box, Stack, Typography } from '@mui/material';

export const TicketHeader = ({ ticket }: { ticket: TicketItem }) => (
  <Box py={1.5} px={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Stack gap={0.75}>
      <Typography variant="body1" color="text.secondary">
        تیکت شماره {ticket.ticket_id}#
      </Typography>
      <Typography variant="body1">موضوع: {ticket.title}</Typography>
    </Stack>
    <Typography variant="subtitle1">{ticket.date.created_at.jalali}</Typography>
  </Box>
);
