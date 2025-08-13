import { styled } from '@mui/material/styles';

export type MainSectionProps = React.ComponentProps<typeof MainRoot>;

export function MainSection({ children, className, sx, ...other }: MainSectionProps) {
  return (
    <MainRoot className={className} sx={sx} {...other}>
      {children}
    </MainRoot>
  );
}

const MainRoot = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  flex: '.5 1 auto',
});
