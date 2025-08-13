import { Icon } from '@iconify/react';

import { styled } from '@mui/material/styles';

import allIcons from './icon-sets';

type IconifyProps = {
  icon: keyof typeof allIcons;
  width?: number | string;
  height?: number | string;
  className?: string;
  sx?: any;
  [key: string]: any;
};

export function Iconify({ icon, width = 20, height, sx, ...other }: IconifyProps) {
  if (!allIcons[icon]) {
    console.warn(`Icon "${icon}" is not available in icon set.`);
    return null;
  }

  return (
    <StyledIcon
      icon={icon}
      width={width}
      height={height ?? width}
      sx={[{ flexShrink: 0, display: 'inline-flex' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    />
  );
}

const StyledIcon = styled(Icon)``;
