import { useState, useEffect } from 'react';

import { drawerClasses } from '@mui/material/Drawer';
import { Box, Drawer, Collapse, ListItem, IconButton, ListItemButton } from '@mui/material';
import { alpha, useTheme, type Theme, type SxProps, type Breakpoint } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify/iconify';

import type { NavItem } from '../nav-config-dashboard';

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  layoutQuery,
  collapsed = false,
  onToggleCollapse,
}: NavContentProps & {
  layoutQuery: Breakpoint;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: theme.zIndex.drawer + 1,
        display: 'none',
        flexDirection: 'column',
        width: collapsed ? 80 : 282,
        height: 1,
        pt: theme.spacing(2.5),
        px: collapsed ? theme.spacing(0.5) : theme.spacing(2),
        backgroundColor: theme.palette.grey[900],
        borderRight: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create(['width', 'padding'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: -15,
          width: 31,
          bgcolor: '#FFF',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '50%',
          zIndex: 1,
        }}
      >
        <IconButton onClick={onToggleCollapse} sx={{ color: 'text.secondary' }}>
          <Iconify
            icon={collapsed ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
            width={14}
          />
        </IconButton>
      </Box>
      <NavContent data={data} slots={slots} collapsed={collapsed} />
    </Box>
  );
}

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          width: 282,
          overflow: 'unset',
          pt: 2.5,
          px: 2.5,
          backgroundColor: '#141A21',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} />
    </Drawer>
  );
}

function NavItemComponent({
  item,
  depth = 1,
  isLastChild = false,
  collapsed = false,
}: {
  item: NavItem;
  depth?: number;
  isLastChild?: boolean;
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive =
    pathname === item.path ||
    (hasChildren && item.children?.some((child) => child.path === pathname));

  useEffect(() => {
    if (hasChildren && item.children?.some((child) => child.path === pathname)) {
      setOpen(true);
    }
  }, [pathname, item.children, hasChildren]);

  const handleToggle = () => {
    if (hasChildren) setOpen(!open);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.25,
        width: '100%',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {depth > 1 && (
        <Box
          sx={{
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 10,
              width: '11px',
              height: '50%',
              border: '1px solid #FFF',
              borderTop: 'none',
              borderRight: 'none',
              borderBottomLeftRadius: '10px',
              opacity: 0.3,
            },
          }}
        />
      )}

      {depth > 1 && !isLastChild && (
        <Box
          sx={{
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 10,
              width: '11px',
              height: '100%',
              borderLeft: '1px solid #FFF',
              opacity: 0.3,
            },
          }}
        />
      )}

      <ListItem disableGutters disablePadding key={item.title}>
        <ListItemButton
          disableGutters
          component={hasChildren ? 'div' : RouterLink}
          href={hasChildren ? undefined : item.path}
          onClick={handleToggle}
          sx={[
            {
              position: 'relative',
              flexDirection: collapsed ? 'column' : 'row',
              alignItems: 'center',
              gap: collapsed ? 0 : 1,
              justifyContent: collapsed ? 'center' : 'flex-start',
              width: depth > 1 ? 'calc(100% - 16px)' : '100%',
              minHeight: depth > 1 ? 34 : collapsed ? 60 : 44,
              maxHeight: depth > 1 ? 34 : undefined,
              py: collapsed ? 0.5 : 1,
              px: collapsed ? 0.5 : 2,
              borderRadius: 1,
              color: 'text.secondary',
              fontSize: collapsed ? '0.6rem' : 'body1.fontSize',
              fontWeight: 'fontWeightRegular',
              marginInlineStart: depth > 1 ? '16px' : 0,
              textAlign: collapsed ? 'center' : 'left',
            },
            {
              ...(isActive && {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary[200],
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                },
              }),
            },
          ]}
        >
          <Box component="span">{item.icon}</Box>
          <Box
            component="span"
            sx={{
              lineHeight: 1.2,
              wordBreak: 'break-word',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              ml: collapsed ? 0 : 1,
            }}
          >
            {item.title}
          </Box>

          {hasChildren && !collapsed && (
            <Iconify
              icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-back-fill'}
              sx={{ position: 'absolute', right: 12 }}
            />
          )}
        </ListItemButton>
      </ListItem>

      {hasChildren && collapsed && hovered && (
        <Box
          sx={{
            position: 'absolute',
            left: '100%',
            top: 0,
            ml: 1,
            zIndex: theme.zIndex.drawer + 2,
            minWidth: 200,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[4],
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          {item.children?.map((child, index) => (
            <ListItemButton
              key={child.title}
              component={RouterLink}
              href={child.path}
              sx={{
                px: 2,
                py: 1,
                color: pathname === child.path ? 'primary.main' : 'text.secondary',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              {child.title}
            </ListItemButton>
          ))}
        </Box>
      )}

      {hasChildren && !collapsed && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ width: 'calc(100% - 11px)', marginInlineStart: '11px' }}>
            {item.children?.map((child, index) => (
              <NavItemComponent
                key={child.title}
                item={child}
                depth={depth + 1}
                isLastChild={index === item.children!.length - 1}
                collapsed={false}
              />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}

export function NavContent({
  data,
  slots,
  sx,
  collapsed = false,
}: NavContentProps & { collapsed?: boolean }) {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          maxWidth: 32,
          marginInline: 'auto',
          marginBlockEnd: collapsed ? 2 : 3.25,
          paddingTop: collapsed ? 0 : theme.spacing(1),
        }}
      >
        <img src="/logo-white.svg" alt="logo" style={{ width: '100%' }} />
      </Box>

      {slots?.topArea}

      <Box
        component="nav"
        sx={[
          {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            alignItems: 'center',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          component="ul"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: collapsed ? 1.5 : 0.625,
            width: '100%',
            position: 'relative',
          }}
        >
          {data.map((item) => (
            <NavItemComponent key={item.title} item={item} collapsed={collapsed} />
          ))}
        </Box>
      </Box>

      {slots?.bottomArea}
    </>
  );
}
