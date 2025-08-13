import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import {
  TicketSchema,
  TicketsSchema,
  type TicketDetailResponse,
  TicketDetailResponseSchema,
} from './types';

const TICKETS_URL = 'https://api2.cafearz.com/test-api';
const TICKET_DETAIL_URL = (id: string) => `https://api2.cafearz.com/test-api-show/${id}`;

export const fetchTicketsWithDetails = async (): Promise<TicketDetailResponse> => {
  try {
    const ticketListRes = await axios.get(TICKETS_URL);
    const parsedList = TicketsSchema.parse(ticketListRes.data);

    const detailPromises = parsedList.tickets.data.map(async (baseTicket) => {
      try {
        const detailRes = await axios.get(TICKET_DETAIL_URL(baseTicket.ticket_id.toString()));
        return TicketSchema.parse(detailRes.data);
      } catch (error) {
        console.error(`Failed to fetch details for ticket ${baseTicket.ticket_id}:`, error);
        return null;
      }
    });

    const detailResponses = await Promise.all(detailPromises);

    const combinedData = {
      filters: parsedList.filters,
      tickets: {
        ...parsedList.tickets,
        data: parsedList.tickets.data.map((baseTicket, index) => {
          const detail = detailResponses[index]?.ticket;
          return {
            ticket_id: baseTicket.ticket_id,
            seen: baseTicket.seen,
            status: baseTicket.status,
            department: baseTicket.department,
            fk_department_id: baseTicket.fk_department_id,
            content: baseTicket.content,
            title: detail?.title,
            date: detail?.date,
            user: baseTicket.user,
          };
        }),
      },
    };

    return TicketDetailResponseSchema.parse(combinedData);
  } catch (error) {
    console.error('Error in fetchTicketsWithDetails:', error);
    throw new Error('Failed to fetch and combine ticket data');
  }
};

export const useFullTickets = () =>
  useQuery<TicketDetailResponse>({
    queryKey: ['full-tickets'],
    queryFn: fetchTicketsWithDetails,
  });

export const fetchTicketDetail = async (id: string) => {
  const res = await axios.get(`${TICKET_DETAIL_URL(id)}`);
  const validated = TicketSchema.safeParse(res.data);

  if (!validated.success) {
    console.error('Validation error:', validated.error);
    throw new Error('Invalid ticket data structure');
  }

  return validated.data;
};

export const useTicketDetail = (id: string) =>
  useQuery({
    queryKey: ['ticket', id],
    queryFn: () => fetchTicketDetail(id),
    enabled: Boolean(id),
  });

export const useTicketDetailList = () =>
  useQuery<TicketDetailResponse>({
    queryKey: ['ticket-detail-list'],
    queryFn: fetchTicketsWithDetails,
  });
