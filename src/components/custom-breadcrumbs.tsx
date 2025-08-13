import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { RouterLink } from 'src/routes/components';

interface BreadcrumbLink {
  name: string;
  href?: string;
}

interface BreadcrumbsLinkProps {
  link: BreadcrumbLink;
  activeLast?: boolean;
  disabled?: boolean;
}

interface CustomBreadcrumbsProps {
  links: BreadcrumbLink[];
  action?: ReactNode;
  heading?: string;
  activeLast?: boolean;
  sx?: object;
  [key: string]: any;
}

function BreadcrumbsLink({ link, activeLast, disabled }: BreadcrumbsLinkProps) {
  const styles = {
    typography: 'body1',
    alignItems: 'center',
    color: 'text.primary',
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && { cursor: 'default', pointerEvents: 'none', color: 'text.secondary' }),
  };

  if (link.href) {
    return (
      <Link component={RouterLink} href={link.href} sx={styles}>
        {link.name}
      </Link>
    );
  }

  return <Box sx={styles}> {link.name} </Box>;
}

function Separator() {
  return (
    <Box
      component="span"
      sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }}
    />
  );
}

export default function CustomBreadcrumbs({
  links,
  action,
  heading,
  activeLast,
  sx,
  ...other
}: CustomBreadcrumbsProps) {
  const lastLink = links[links.length - 1].name;

  return (
    <Stack spacing={2} sx={sx}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {heading && (
            <Typography variant="h4" sx={{ mb: 2 }}>
              {heading}
            </Typography>
          )}

          {!!links.length && (
            <Breadcrumbs separator={<Separator />} {...other}>
              {links.map((link, index) => (
                <BreadcrumbsLink
                  key={link.name ?? index}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>
    </Stack>
  );
}
