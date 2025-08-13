import { lazy, Suspense } from "react";
import { RouteObject, Outlet, Navigate } from "react-router-dom";

import Box from "@mui/material/Box";
import { alpha } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { DashboardLayout } from "src/layout/dashboard";

const TicketsPage = lazy(
  () => import("src/sections/tickets/tickets-list-page/tickets-list-view")
);
const NewTicketPage = lazy(
  () => import("src/sections/tickets/ticket-create-page/ticket-create-view")
);
const TicketDetailsPage = lazy(
  () => import("src/sections/tickets/ticket-details-page/ticket-details-view")
);

const renderFallback = () => (
  <Box
    sx={{
      display: "flex",
      flex: "1 1 auto",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => alpha(theme.palette.text.primary, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    path: "dashboard",
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <Navigate to="tickets" replace /> },
      {
        path: "tickets",
        children: [
          { index: true, element: <TicketsPage /> },
          { path: "list", element: <TicketsPage /> },
          { path: "new", element: <NewTicketPage /> },
          { path: "show/:id", element: <TicketDetailsPage /> },
        ],
      },
    ],
  },
];
