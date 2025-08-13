import type { Breakpoint, ContainerProps } from '@mui/material';

import { Container } from '@mui/material';

export type DashboardContentProps = ContainerProps & {
  layoutQuery?: Breakpoint;
  disablePadding?: boolean;
};

export function DashboardContent({ sx, children, className, disablePadding, maxWidth = 'lg', layoutQuery = 'lg', ...other }: DashboardContentProps) {
  return (
    <Container
      className={className}
      maxWidth={maxWidth}
      sx={[ (theme) => ({
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          pt: theme.spacing(1),
          pb: theme.spacing(8),
          [theme.breakpoints.up(layoutQuery)]: {
            px: theme.spacing(5),
          },
          ...(disablePadding && {
            p: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}>
      {children}
    </Container>
  );
}
