import type { TicketItem } from 'src/api/types';

import { Box, Card, Stack, Typography } from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify/iconify';

import { UserProfile } from '../user-profile';

export const UserInfoCard = ({ ticket }: { ticket: TicketItem }) => (
  <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2.75 }}>
    <UserProfile
      user={{
        name: ticket.user.name,
        avatar: ticket.user.avatar,
        level: ticket.user.level,
        verify: ticket.user.verify,
      }}
    />
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 0.75 }}>
      <Stack direction="row" sx={{ gap: 1.25 }}>
        <Label
          variant="outlined"
          sx={{ width: 44, height: 44, borderRadius: 1.5, '& svg, img': { width: 24, height: 24 } }}
        >
          <Iconify icon="material-symbols:wallet" />
        </Label>
        <Stack>
          <Typography variant="subtitle2" color="text.secondary">
            موجودی کاربر
          </Typography>
          <Typography variant="subtitle1">
            {ticket.user.balance.toLocaleString()}{' '}
            <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'inline' }}>
              تومان
            </Typography>
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" sx={{ gap: 1.25 }}>
        <Label
          variant="outlined"
          sx={{ width: 44, height: 44, borderRadius: 1.5, '& svg, img': { width: 24, height: 24 } }}
        >
          <Iconify icon="material-symbols:mobile-outline" />
        </Label>
        <Stack>
          <Typography variant="subtitle2" color="text.secondary">
            شماره تماس
          </Typography>
          <Typography variant="subtitle1">{ticket.user.mobile}</Typography>
        </Stack>
      </Stack>

      <Stack direction="row" sx={{ gap: 1.25 }}>
        <Label
          variant="outlined"
          sx={{ width: 44, height: 44, borderRadius: 1.5, '& svg, img': { width: 24, height: 24 } }}
        >
          <Iconify icon="material-symbols:stacked-email-sharp" />
        </Label>
        <Stack>
          <Typography variant="subtitle2" color="text.secondary">
            ایمیل کاربر
          </Typography>
          <Typography variant="subtitle1">
            {ticket.user.email ? ticket.user.email : 'ثبت نشده'}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" sx={{ gap: 1.25 }}>
        <Label
          variant="outlined"
          sx={{ width: 44, height: 44, borderRadius: 1.5, '& svg, img': { width: 24, height: 24 } }}
        >
          <Iconify icon="material-symbols:security-rounded" />
        </Label>
        <Stack>
          <Typography variant="subtitle2" color="text.secondary">
            وضعیت شاهکار
          </Typography>
          <Label
            variant="soft"
            color={ticket.user.shahkar.key === 'no_check' ? 'warning' : 'error'}
            sx={{ fontSize: 10, fontWeight: 500 }}
          >
            {ticket.user.shahkar.label}
          </Label>
        </Stack>
      </Stack>
    </Box>
  </Card>
);
