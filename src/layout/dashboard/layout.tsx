import type { Breakpoint } from '@mui/material/styles';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Avatar, Typography, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify/iconify';

import { NavMobile, NavDesktop } from './nav';
import { navData } from '../nav-config-dashboard';
import { MainSection } from '../core/main-section';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';

import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type DashboardLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

export function DashboardLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: DashboardLayoutProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false,
      },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      leftArea: (
        <>
          <IconButton
            sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
            onClick={handleOpen}
          >
            <Iconify icon="duo-icons:menu" width={24} />
          </IconButton>

          <NavMobile data={navData} open={open} onClose={handleClose} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0, sm: 0.25 },
            }}
          >
            <IconButton>
              <Iconify icon="solar:archive-check-bold-duotone" />
            </IconButton>
            <IconButton>
              <Iconify icon="solar:bag-3-bold" />
            </IconButton>
            <IconButton>
              <Iconify icon="solar:bell-bold-duotone" />
            </IconButton>
            <IconButton>
              <Iconify icon="solar:card-bold-duotone" />
            </IconButton>
            <IconButton>
              <Iconify icon="solar:cart-large-2-bold-duotone" />
            </IconButton>
          </Box>
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.75 } }}>
          <IconButton
            sx={{
              p: '2px',
              width: 36,
              aspectRatio: '1',
              background: `conic-gradient(${theme.palette.primary.light}, ${theme.palette.warning.light}, ${theme.palette.primary.light})`,
            }}
          >
            <Avatar src="/assets/images/avatar.jpg" alt="admin avatar" sx={{ width: 1, height: 1 }}>
              سمانه عسکری
            </Avatar>
          </IconButton>
          <Typography variant="body2">سمانه عسکری</Typography>
        </Box>
      ),
    };

    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{
          ...headerSlots,
          ...(slotProps?.header?.slots || {})
        }}
        slotProps={{
          ...headerSlotProps,
          ...(slotProps?.header?.slotProps || {})
        }}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      headerSection={renderHeader()}
      sidebarSection={
        <NavDesktop
          data={navData}
          layoutQuery={layoutQuery}
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
        />
      }
      cssVars={{ ...cssVars }}
      sx={[
        {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: collapsed ? '104px' : '282px',
            transition: theme.transitions.create(['padding-left'], {
              easing: 'linear',
              duration: '120ms',
            }),
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
  );
}