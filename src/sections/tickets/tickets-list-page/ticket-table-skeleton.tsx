/* eslint-disable @typescript-eslint/no-shadow */
import { Skeleton, TableRow, TableCell } from '@mui/material';

export function TicketTableSkeleton({ rows = 5 }: { rows?: number }) {
  return [...Array(rows)].map((_, rowIndex) => (
    <TableRow key={rowIndex}>
      {[...Array(7)].map((_, cellIndex) => (
        <TableCell key={cellIndex}>
          {cellIndex === 1 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Skeleton variant="circular" width={40} height={40} />
              <div>
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={80} height={16} />
              </div>
            </div>
          ) : cellIndex === 5 ? (
            <Skeleton variant="rounded" width={80} height={24} />
          ) : cellIndex === 6 ? (
            <Skeleton variant="circular" width={24} height={24} />
          ) : (
            <Skeleton variant="text" width="80%" height={20} />
          )}
        </TableCell>
      ))}
    </TableRow>
  ));
}
