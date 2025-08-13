import { useState, useEffect } from "react";
import type { AppBarProps } from "@mui/material/AppBar";
import type { ContainerProps } from "@mui/material/Container";

import { AppBar, Container } from "@mui/material";
import {
  alpha,
  styled,
  type Theme,
  type SxProps,
  type CSSObject,
  type Breakpoint,
} from "@mui/material/styles";

export type HeaderSectionProps = AppBarProps & {
  layoutQuery?: Breakpoint;
  disableOffset?: boolean;
  disableElevation?: boolean;
  slots?: {
    leftArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    topArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  slotProps?: {
    container?: ContainerProps;
    centerArea?: React.ComponentProps<"div"> & { sx?: SxProps<Theme> };
  };
};

export function HeaderSection({
  sx,
  slots,
  slotProps,
  className,
  disableOffset,
  disableElevation,
  layoutQuery = "md",
  ...other
}: HeaderSectionProps) {
  const [isOffset, setIsOffset] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsOffset(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderRoot
      position="sticky"
      color="transparent"
      isOffset={isOffset}
      disableOffset={disableOffset}
      disableElevation={disableElevation}
      className={className}
      sx={[
        (theme) => ({
          ...(isOffset && {
            "--color": `var(--offset-color, ${theme.palette.text.primary})`,
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {slots?.topArea}

      <HeaderContainer layoutQuery={layoutQuery} {...slotProps?.container}>
        {slots?.leftArea}

        <HeaderCenterArea {...slotProps?.centerArea}>
          {slots?.centerArea}
        </HeaderCenterArea>

        {slots?.rightArea}
      </HeaderContainer>

      {slots?.bottomArea}
    </HeaderRoot>
  );
}

type HeaderRootProps = Pick<
  HeaderSectionProps,
  "disableOffset" | "disableElevation"
> & {
  isOffset: boolean;
};

const HeaderRoot = styled(AppBar, {
  shouldForwardProp: (prop: string) =>
    !["isOffset", "disableOffset", "disableElevation", "sx"].includes(prop),
})<HeaderRootProps>(({ isOffset, disableOffset, disableElevation, theme }) => {
  const pauseZindex = { top: -1, bottom: -2 };

  const pauseStyles: CSSObject = {
    content: '""',
    position: "absolute",
    visibility: "hidden",
    opacity: 0,
    transition: theme.transitions.create(["opacity", "visibility"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
  };

  const bgStyles: CSSObject = {
    ...pauseStyles,
    top: 0,
    left: 0,
    zIndex: pauseZindex.top,
    width: "100%",
    height: "100%",
    backgroundColor: alpha(theme.palette.background.neutralChannel, 0.8),
    backdropFilter: `blur(6px)`,
    WebkitBackdropFilter: `blur(6px)`,
    ...(isOffset && {
      visibility: "visible",
      opacity: 1,
    }),
  };

  const shadowStyles: CSSObject = {
    ...pauseStyles,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: pauseZindex.bottom,
    width: `calc(100% - 48px)`,
    height: 24,
    margin: "auto",
    borderRadius: "50%",
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.1)",
    ...(isOffset && { visibility: "visible", opacity: 0.48 }),
  };

  return {
    zIndex: theme.zIndex.appBar + 1,
    boxShadow: "none",
    ...(!disableOffset && { "&::before": bgStyles }),
    ...(!disableElevation && { "&::after": shadowStyles }),
  };
});

const HeaderContainer = styled(Container, {
  shouldForwardProp: (prop: string) => !["layoutQuery", "sx"].includes(prop),
})<Pick<HeaderSectionProps, "layoutQuery">>(
  ({ layoutQuery = "md", theme }) => ({
    display: "flex",
    alignItems: "center",
    height: "64px",
    color: "var(--color)",
    [theme.breakpoints.up(layoutQuery)]: { height: "72px" },
  })
);

const HeaderCenterArea = styled("div")(() => ({
  display: "flex",
  flex: "1 1 auto",
  justifyContent: "center",
}));
