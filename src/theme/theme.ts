import { createTheme, type ThemeOptions } from '@mui/material/styles';

const palette = {
  primary: {
    50: '#e6f4fd',
    100: '#b2dcfa',
    200: '#8dcbf7',
    300: '#59b3f4',
    400: '#39a4f1',
    500: '#078dee',
    600: '#0680d9',
    700: '#0564a9',
    800: '#044e83',
    900: '#033b64',
    lighter: '#e6f4fd', // alias for 50
    light: '#59b3f4', // alias for 300
    main: '#078dee', // alias for 500
    dark: '#0564a9', // alias for 700
    darker: '#033b64', // alias for 900
    contrastText: '#FFFFFF',
  },
  secondary: {
    lighter: '#EFD6FF',
    light: '#C684FF',
    main: '#8E33FF',
    dark: '#5119B7',
    darker: '#27097A',
    contrastText: '#FFFFFF',
  },
  info: {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#FFFFFF',
  },
  success: {
    50: '#e6f6f1',
    100: '#b0e4d3',
    200: '#8ad7bd',
    300: '#54c49f',
    400: '#33b98d',
    500: '#00a770',
    600: '#009866',
    700: '#007750',
    800: '#005c3e',
    900: '#00462f',
    lighter: '#e6f6f1', // alias for 50
    light: '#54c49f', // alias for 300
    main: '#00a770', // alias for 500
    dark: '#007750', // alias for 700
    darker: '#00462f', // alias for 900
    contrastText: '#FFFFFF',
  },
  warning: {
    50: '#fff6ea',
    100: '#fee4be',
    200: '#fed79e',
    300: '#fec572',
    400: '#fdba57',
    500: '#fda92d',
    600: '#e69a29',
    700: '#b47820',
    800: '#8b5d19',
    900: '#6a4713',
    lighter: '#fff6ea', // alias for 50
    light: '#fec572', // alias for 300
    main: '#fda92d', // alias for 500
    dark: '#b47820', // alias for 700
    darker: '#6a4713', // alias for 900
    contrastText: '#1C252E',
  },
  error: {
    50: '#ffeaea',
    100: '#ffbfbf',
    200: '#ffa0a0',
    300: '#ff7474',
    400: '#ff5959',
    500: '#ff3030',
    600: '#e82c2c',
    700: '#b52222',
    800: '#8c1a1a',
    900: '#6b1414',
    lighter: '#ffeaea', // alias for 50
    light: '#ff7474', // alias for 300
    main: '#ff3030', // alias for 500
    dark: '#b52222', // alias for 700
    darker: '#6b1414', // alias for 900
    contrastText: '#FFFFFF',
  },
  grey: {
    50: '#FCFDFD',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#1C252E',
    900: '#141A21',
  },
  common: {
    black: '#000000',
    white: '#FFFFFF',
    whiteChannel: '255 255 255',
    blackChannel: '0 0 0',
  },
  divider: 'rgba(145, 158, 171, 0.2)',
  text: {
    primary: '#1C252E',
    secondary: '#637381',
    disabled: '#919EAB',
    disabledChannel: '145 158 171',
  },
  background: {
    paper: '#FFFFFF',
    default: '#F9FAFB',
    neutral: '#F4F6F8',
    neutralChannel: '#F4F6F8',
  },
};

const typography = {
  fontFamily: 'IRANYekanX, sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: 40,
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: 32,
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: 24,
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: 20,
  },
  h5: {
    fontWeight: 800,
    lineHeight: 1.5,
    fontSize: 18,
  },
  h6: {
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: 17,
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 22 / 12,
    fontSize: 12,
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 22 / 10,
    fontSize: 10,
  },
  body1: {
    fontWeight: 700,
    lineHeight: 1.43,
    fontSize: 14,
  },
  body2: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: 12,
  },
  caption: {
    fontWeight: 400,
    lineHeight: 1.4,
    fontSize: 11,
  },
  button: {
    fontWeight: 700,
    lineHeight: 1.71,
    fontSize: 14,
    textTransform: 'none' as const,
  },
};

const shadows = [
  'none',
  '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '0px 4px 8px rgba(0, 0, 0, 0.1)',
  '0px 6px 12px rgba(0, 0, 0, 0.1)',
  '0px 8px 16px rgba(0, 0, 0, 0.1)',
  '0px 10px 20px rgba(0, 0, 0, 0.1)',
  '0px 12px 24px rgba(0, 0, 0, 0.1)',
  '0px 14px 28px rgba(0, 0, 0, 0.1)',
  '0px 16px 32px rgba(0, 0, 0, 0.1)',
  '0px 18px 36px rgba(0, 0, 0, 0.1)',
  '0px 20px 40px rgba(0, 0, 0, 0.1)',
  '0px 22px 44px rgba(0, 0, 0, 0.1)',
  '0px 24px 48px rgba(0, 0, 0, 0.1)',
  '0px 26px 52px rgba(0, 0, 0, 0.1)',
  '0px 28px 56px rgba(0, 0, 0, 0.1)',
  '0px 30px 60px rgba(0, 0, 0, 0.1)',
  '0px 32px 64px rgba(0, 0, 0, 0.1)',
  '0px 34px 68px rgba(0, 0, 0, 0.1)',
  '0px 36px 72px rgba(0, 0, 0, 0.1)',
  '0px 38px 76px rgba(0, 0, 0, 0.1)',
  '0px 40px 80px rgba(0, 0, 0, 0.1)',
  '0px 42px 84px rgba(0, 0, 0, 0.1)',
  '0px 44px 88px rgba(0, 0, 0, 0.1)',
  '0px 46px 92px rgba(0, 0, 0, 0.1)',
  '0px 48px 96px rgba(0, 0, 0, 0.1)',
] as ThemeOptions['shadows'];

export const baseTheme: ThemeOptions = {
  palette,
  typography,
  shadows,
  shape: {
    borderRadius: 8,
  },
  components: {},
};

export function createAppTheme(options?: ThemeOptions) {
  return createTheme({
    ...baseTheme,
    ...options,
  });
}
