import type { Theme, SxProps, CSSObject } from '@mui/material/styles';

import { styled, GlobalStyles } from '@mui/material';

export type LayoutSectionProps = React.ComponentProps<'div'> & {
  sx?: SxProps<Theme>;
  cssVars?: CSSObject;
  children?: React.ReactNode;
  headerSection?: React.ReactNode;
  sidebarSection?: React.ReactNode;
};

export function LayoutSection({ sx, cssVars, children, headerSection, sidebarSection, className, ...other }: LayoutSectionProps) {
  const inputGlobalStyles = <GlobalStyles styles={{ body: { ...cssVars } }} />;

  return (
    <>
      {inputGlobalStyles}

      <LayoutRoot id="root__layout" className={className} sx={sx} {...other}>
        {sidebarSection ? (
          <>
            {sidebarSection}
            <LayoutSidebarContainer>
              {headerSection}
              {children}
            </LayoutSidebarContainer>
          </>
        ) : (
          <>
            {headerSection}
            {children}
          </>
        )}
      </LayoutRoot>
    </>
  );
}

const LayoutRoot = styled('div')``;

const LayoutSidebarContainer = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
}));
