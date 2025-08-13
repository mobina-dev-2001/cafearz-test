import { styled, type Theme, type SxProps, type CSSObject } from '@mui/material/styles';

export type LabelColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
export type LabelVariant = 'filled' | 'soft' | 'outlined';

export interface LabelProps extends React.ComponentProps<'span'> {
  sx?: SxProps<Theme>;
  color?: LabelColor;
  variant?: LabelVariant;
}

export const LabelRoot = styled('span', {
  shouldForwardProp: (prop: string) => !['color', 'variant', 'disabled', 'sx'].includes(prop),
})<LabelProps>(({ color = 'primary', variant = 'soft', theme }) => {
  const colorStyles: CSSObject = {
    ...(variant === 'filled' && {
      backgroundColor: theme.palette[color][600],
      color: theme.palette.common.white,
    }),

    ...(variant === 'outlined' && {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.grey[300]}`,
      color: theme.palette.grey[500],
    }),

    ...(variant === 'soft' && {
      backgroundColor: theme.palette[color].lighter,
      color: theme.palette[color][600],
    }),
  };

  return {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    minWidth: 24,
    minHeight: 24,
    padding: theme.spacing(0, 0.75),
    borderRadius: Number(theme.shape.borderRadius) * 0.75,
    fontSize: theme.typography.body2.fontSize,
    lineHeight: 0,
    whiteSpace: 'nowrap',
    cursor: 'default',
    transition: theme.transitions.create(['all'], { duration: theme.transitions.duration.shorter }),
    ...colorStyles,
  };
});

export const LabelIcon = styled('span')({ flexShrink: 0, width: 16, height: 16,
  '& svg, img': { width: '100%', height: '100%', objectFit: 'cover' },
});

export function Label({ sx, children, variant = 'soft', color = 'primary', ...other }: LabelProps) {
  return (
    <LabelRoot color={color} variant={variant} sx={sx} {...other}>
      {children}
    </LabelRoot>
  );
}
