import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import Rtl from './rtl';
import { components } from './components';
import { baseTheme, createAppTheme } from './theme';

export function ThemeProvider({
  children,
  direction = 'rtl',
}: {
  children: React.ReactNode;
  direction?: 'rtl' | 'ltr';
}) {
  const theme = createAppTheme({
    ...baseTheme,
    direction,
    components,
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Rtl>
        <CssBaseline />
        {children}
      </Rtl>
    </MuiThemeProvider>
  );
}
