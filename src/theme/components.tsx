import type { Theme, Components } from '@mui/material/styles';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export const components: Components<Theme> = {
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 50,
        borderRadius: Number(theme.shape.borderRadius) * 1.25,
      }),
      containedInherit: ({ theme }) => ({
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        '&:hover': {
          backgroundColor: theme.palette.grey[800],
        },
      }),
      sizeLarge: { minHeight: 52 },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        position: 'relative',
        zIndex: 0,
        background: theme.palette.common.white,
        borderRadius: Number(theme.shape.borderRadius) * 1.5,
        boxShadow: '0px 4px 10px 0px #00000008',
      }),
    },
  },
  MuiCardHeader: {
    defaultProps: {
      titleTypographyProps: { variant: 'h6' },
      subheaderTypographyProps: { variant: 'body2' },
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(3, 3, 0),
      }),
    },
  },
  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: { backgroundImage: 'none' },
      outlined: ({ theme }) => ({
        borderColor: theme.palette.divider,
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: ({ theme }) => ({
        borderColor: theme.palette.divider,
      }),
    },
  },
  MuiTextField: {
    defaultProps: { variant: 'outlined' },
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiInputLabel-root': {
          color: theme.palette.text.secondary,
          '&.Mui-focused': {
            color: theme.palette.text.primary,
          },
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: Number(theme.shape.borderRadius) * 1,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.primary,
          },
        },
      }),
    },
  },
  MuiSelect: {
    defaultProps: { IconComponent: KeyboardArrowDownRoundedIcon },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) * 1,
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2,
          borderColor: theme.palette.text.primary,
        },
      }),
      icon: ({ theme }) => ({
        left: 'auto',
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-selected': {
          backgroundColor: theme.palette.grey[400],
          '&:hover': {
            backgroundColor: theme.palette.grey[300],
          },
        },
      }),
    },
  },
  MuiLink: {
    defaultProps: { underline: 'hover' },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 0,
        boxShadow: `inset 0 -2px 0 0 ${theme.palette.divider}`,
      }),
      indicator: ({ theme }) => ({
        backgroundColor: theme.palette.text.primary,
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 50,
        padding: theme.spacing(0, 1.5),
        ...theme.typography.body2,
        '&.Mui-selected': {
          color: theme.palette.text.primary,
        },
      }),
    },
  },
  MuiDialog: {
    defaultProps: { fullWidth: true, maxWidth: 'md' },
    styleOverrides: {
      paper: ({ theme }) => ({
        width: '80vw',
        maxWidth: 700,
        padding: theme.spacing(2),
        borderRadius: Number(theme.shape.borderRadius) * 2,
      }),
    },
  },
  MuiPagination: {
    styleOverrides: {
      root: { display: 'flex', justifyContent: 'center' },
      ul: ({ theme }) => ({
        '& .Mui-selected': {
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.common.white,
          fontWeight: theme.typography.fontWeightMedium,
          '&:hover': {
            backgroundColor: theme.palette.grey[700],
          },
        },
      }),
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        ...theme.typography.body1,
      }),
    },
  },
};
