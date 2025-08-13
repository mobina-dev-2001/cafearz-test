import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
    [key: number]: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }

  interface TypeBackground {
    neutral: string;
    neutralChannel: string;
  }

  interface TypeText {
    disabledChannel: string;
  }

  interface CommonColors {
    whiteChannel: string;
    blackChannel: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    fontWeightSemiBold: true;
  }
}
