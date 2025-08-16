import type { FiltersState } from "src/utils/use-filters";
import type { Filters, CombinedTicket } from "src/api/types";

import { useMemo, useState, useEffect, useCallback } from "react";

import {
  Box,
  Tab,
  Card,
  Tabs,
  Table,
  Button,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  Pagination,
  Skeleton,
} from "@mui/material";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";

import { useFilters } from "src/utils/use-filters";

import { useFullTickets } from "src/api/api";
import { DashboardContent } from "src/layout/dashboard";

import { Label } from "src/components/label";
import { Iconify } from "src/components/iconify/iconify";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import { getLabelColor } from "./utils";
import FormDialog from "./Filter-dialog";
import { TicketTableRow } from "./ticket-table-row";
import { TicketTableSkeleton } from "./ticket-table-skeleton";
import { TicketTableFiltersResult } from "./ticket-table-filters-result";
import { TABLE_HEAD, ROWS_PER_PAGE, STATUS_OPTIONS } from "../tickets-config";

export default function TicketsListView() {
  const router = useRouter();
  const { data, isLoading } = useFullTickets();

  const filters = useFilters({ status: "ALL" });
  const [filterOptions, setFilterOptions] = useState<Filters[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (data?.filters) {
      setFilterOptions(data.filters);
    }
  }, [data]);

  const tableData = useMemo(() => data?.tickets.data || [], [data]);

  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData: tableData,
        filters: filters.state,
      }),
    [tableData, filters.state]
  );

  const canReset = Object.entries(filters.state).some(
    ([key, value]) =>
      (key !== "status" && value !== "" && value !== undefined) ||
      (key === "status" && value !== "ALL")
  );

  const notFound =
    !isLoading && ((!dataFiltered.length && canReset) || !dataFiltered.length);

  const handleViewTicket = useCallback(
    (ticketId: string) => {
      router.push(paths.tickets.show(ticketId));
    },
    [router]
  );

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage - 1);
  }, []);

  const handleResetPage = useCallback(() => {
    setPage(0);
  }, []);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="لیست تیکت ها"
        links={[
          { name: "داشبورد", href: paths.dashboard.root },
          { name: "تیکت ها", href: paths.tickets.list },
          { name: "لیست تیکت ها" },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.tickets.new}
            variant="contained"
            color="success"
            sx={{ minHeight: 0, py: 1, fontSize: 12, fontWeight: 700 }}
            startIcon={<Iconify icon="solar:add-circle-outline" />}
          >
            تیکت جدید
          </Button>
        }
        sx={{ mb: 2.5 }}
        activeLast={undefined}
      />

      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 0.75,
            px: 2,
          }}
        >
          <Typography variant="body2">
            لیست تیکت ها{" "}
            {isLoading ? (
              <Skeleton
                width={25}
                height={20}
                sx={{ display: "inline-block" }}
              />
            ) : (
              data?.tickets.data.length
            )}
          </Typography>

          {filterOptions.length > 0 && (
            <FormDialog
              filters={filterOptions}
              appliedFilters={filters.state}
              onApplyFilters={(newFilters) => {
                handleResetPage();
                filters.setState(newFilters);
              }}
            />
          )}
        </Box>

        <Tabs
          value={filters.state.status || "ALL"}
          onChange={(event, newValue) => {
            handleResetPage();
            filters.setState({ status: newValue });
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={
                tab.value === "ALL" ? undefined : (
                  <Label
                    variant={
                      tab.value === filters.state.status ? "filled" : "soft"
                    }
                    color={getLabelColor(tab.value)}
                  >
                    {
                      tableData.filter(
                        (ticket) => ticket.status.key === tab.value
                      ).length
                    }
                  </Label>
                )
              }
              iconPosition="end"
            />
          ))}
        </Tabs>

        {canReset && (
          <TicketTableFiltersResult
            filters={filters}
            onResetPage={handleResetPage}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <Box sx={{ position: "relative" }}>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell key={headCell.id} align="left">
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TicketTableSkeleton rows={ROWS_PER_PAGE} />
              ) : (
                dataFiltered
                  .slice(
                    page * ROWS_PER_PAGE,
                    page * ROWS_PER_PAGE + ROWS_PER_PAGE
                  )
                  .map((row) => (
                    <TicketTableRow
                      key={row.ticket_id}
                      row={row}
                      onView={() => handleViewTicket(row.ticket_id.toString())}
                    />
                  ))
              )}

              {notFound && (
                <TableRow>
                  <TableCell
                    colSpan={12}
                    sx={{ color: "text.disabled", textAlign: "center" }}
                  >
                    <img
                      src="/assets/images/ic-content.svg"
                      alt=""
                      aria-hidden="true"
                    />
                    <Typography variant="h6">
                      متاسفانه چیزی برای نمایش وجود نداره!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        <Pagination
          count={Math.ceil(dataFiltered.length / ROWS_PER_PAGE)}
          page={page + 1}
          onChange={handleChangePage}
          sx={{
            py: 2,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        />
      </Card>
    </DashboardContent>
  );
}

function applyFilter({
  inputData,
  filters,
}: {
  inputData: CombinedTicket[];
  filters: FiltersState;
}) {
  return inputData.filter((ticket) => {
    if (
      filters.ticket_id &&
      !ticket.ticket_id.toString().includes(filters.ticket_id)
    ) {
      return false;
    }

    if (
      filters.fk_user_id &&
      ticket.user.fk_user_id.toString() !== filters.fk_user_id
    ) {
      return false;
    }

    if (filters.name && !ticket.user.name.includes(filters.name)) {
      return false;
    }

    if (filters.mobile && !ticket.user.mobile.includes(filters.mobile)) {
      return false;
    }

    if (filters.email && !ticket.user.email.includes(filters.email)) {
      return false;
    }

    if (
      filters.national_code &&
      !ticket.user.national_code.includes(filters.national_code)
    ) {
      return false;
    }

    if (filters.content && !ticket.content.includes(filters.content)) {
      return false;
    }

    if (
      filters.ip_address &&
      !ticket.user.ip_address.includes(filters.ip_address)
    ) {
      return false;
    }

    if (
      filters.fk_department_id &&
      ticket.fk_department_id.toString() !== filters.fk_department_id.toString()
    ) {
      return false;
    }

    if (filters.status && filters.status !== "ALL") {
      if (ticket.status.key.toUpperCase() !== filters.status.toUpperCase()) {
        return false;
      }
    }

    return true;
  });
}
