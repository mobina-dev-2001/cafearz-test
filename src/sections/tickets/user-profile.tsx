import { Stack, Avatar, Typography } from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify/iconify';

interface UserProfileProps {
  user: {
    name: string;
    avatar?: string;
    legal?: string | boolean;
    level?: string;
    verify: {
      mobile: boolean;
      email: boolean;
      credit?: boolean;
      national?: boolean;
      phone?: boolean;
    };
  };
}

export const UserProfile = ({ user }: UserProfileProps) => (
  <Stack spacing={1.25}>
    <Stack direction="row" gap={1}>
      <Avatar alt={user.name} src={user.avatar} />
      <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
        <Typography variant="subtitle1">{user.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          سطح {user.legal || (user.level === 'E' ? 'نقره ای' : 'ناشناخته')}
        </Typography>
      </Stack>
    </Stack>

    <Stack direction="row" gap={0.375}>
      <Label
        color={user.verify?.national ? (user.verify?.national ? 'success' : 'error') : 'warning'}
        variant="filled"
        sx={{ maxWidth: 24 }}
      >
        <Iconify icon="solar:user-id-outline" />
      </Label>
      <Label
        color={user.verify?.credit ? (user.verify?.credit ? 'success' : 'error') : 'warning'}
        variant="filled"
        sx={{ maxWidth: 24 }}
      >
        <Iconify icon="solar:document-text-linear" />
      </Label>
      <Label color="warning" variant="filled" sx={{ maxWidth: 24 }}>
        <Iconify icon="solar:videocamera-outline" />
      </Label>
      <Label color={user.verify.email ? 'success' : 'error'} variant="filled" sx={{ maxWidth: 24 }}>
        <Iconify icon="solar:letter-linear" />
      </Label>
      <Label
        color={user.verify?.phone ? (user.verify?.phone ? 'success' : 'error') : 'warning'}
        variant="filled"
        sx={{ maxWidth: 24 }}
      >
        <Iconify icon="solar:phone-calling-outline" />
      </Label>
      <Label
        color={user.verify.mobile ? 'success' : 'error'}
        variant="filled"
        sx={{ maxWidth: 24 }}
      >
        <Iconify icon="solar:smartphone-2-outline" />
      </Label>
    </Stack>
  </Stack>
);
