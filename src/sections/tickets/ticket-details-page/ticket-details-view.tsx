import type { SelectChangeEvent } from '@mui/material';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Card, Alert, CircularProgress } from '@mui/material';

import { useTicketDetail } from 'src/api/api';
import { DashboardContent } from 'src/layout/dashboard';

import { useReplyForm } from './utils';
import { ReplyForm } from './reply-form';
import { TicketHeader } from './ticket-header';
import { UserInfoCard } from './user-info-card';
import { TicketInfoCard } from './ticket-info-card';
import { ConversationMessages } from './ticket-messages';

import type { ReplyFormValues } from './types';

export default function TicketDetailsView() {
  const { id } = useParams<{ id: string }>();
  const { data: ticketResponse, isLoading, isError, error } = useTicketDetail(id || '');
  const { control, reset, setValue, formState, handleSubmit } = useReplyForm();

  const [ticketInfo, setTicketInfo] = useState({
    status: ticketResponse?.ticket?.status.key,
    priority: ticketResponse?.ticket?.priority.key,
    department: ticketResponse?.ticket?.fk_department.key,
  });

  const handleStatusChange = (event: SelectChangeEvent) => {
    setTicketInfo((prev) => ({
      ...prev,
      status: event.target.value,
    }));
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setTicketInfo((prev) => ({
      ...prev,
      priority: event.target.value,
    }));
  };

  const handleDepartmentChange = (event: SelectChangeEvent<number>) => {
    setTicketInfo((prev) => ({
      ...prev,
      department: Number(event.target.value),
    }));
  };

  const onSubmit = async (data: ReplyFormValues) => {
    console.log('Form data:', data);
    reset();
  };

  if (isLoading) {
    return (
      <DashboardContent>
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  if (isError) {
    return (
      <DashboardContent>
        <Alert severity="error">
          {error instanceof Error ? error.message : 'خطا در دریافت اطلاعات تیکت'}
        </Alert>
      </DashboardContent>
    );
  }

  if (!ticketResponse?.ticket) {
    return (
      <DashboardContent>
        <Alert severity="warning">تیکت یافت نشد</Alert>
      </DashboardContent>
    );
  }

  const { ticket } = ticketResponse;

  return (
    <DashboardContent>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 2 }}>
        <Card>
          <TicketHeader ticket={ticket} />
          <TicketInfoCard
            ticket={{
              ...ticket,
              status: ticket.status,
              priority: ticket.priority,
              fk_department: ticket.fk_department,
            }}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
            onDepartmentChange={handleDepartmentChange}
          />
        </Card>

        <UserInfoCard ticket={ticket} />

        <Card sx={{ gridColumn: 'span 2', p: '25px' }}>
          <ConversationMessages ticket={ticket} />

          <ReplyForm
            onSubmit={onSubmit}
            control={control}
            errors={formState.errors}
            setValue={setValue}
            reset={reset}
            handleSubmit={handleSubmit}
          />
        </Card>
      </Box>
    </DashboardContent>
  );
}
