import { z } from 'zod';

// ==================== BASE SCHEMAS ====================
const VerifySchema = z.object({
  mobile: z.boolean(),
  email: z.boolean(),
  credit: z.boolean(),
  national: z.boolean(),
  phone: z.boolean(),
});

const StatusSchema = z.object({
  key: z.string(),
  label: z.string(),
});

const PaginationSchema = z.object({
  current_page: z.number(),
  total: z.number(),
  per_page: z.number(),
  last_page: z.number(),
});

const FilterOptionSchema = z.object({
  _id: z.union([z.string(), z.number()]),
  value: z.string(),
});

const FilterSchema = z.object({
  type: z.enum(['text', 'select']),
  name: z.string(),
  label: z.string(),
  value: z.string(),
  options: z.array(FilterOptionSchema),
  attr: z.union([z.array(z.unknown()), z.object({ select_type: z.literal('single') }).partial()]),
});

const DateInfoSchema = z.object({
  time: z.string(),
  jalali: z.string(),
  milady: z.string(),
});

const PrioritySchema = z.object({
  key: z.string(),
  value: z.string(),
});

const DepartmentSchema = z.object({
  key: z.number(),
  value: z.string(),
});

const UserInfoSchema = z.object({
  is_admin: z.boolean(),
  name: z.string(),
  avatar: z.string(),
});

const ReplySchema = z.object({
  user_info: UserInfoSchema,
  content: z.string(),
  date: z.object({
    created_at: DateInfoSchema,
  }),
});

// ==================== MAIN SCHEMAS ====================
export const TicketsSchema = z.object({
  tickets: z.object({
    data: z.array(
      z.object({
        user: z.object({
          fk_user_id: z.number(),
          mobile: z.string(),
          name: z.string(),
          ip_address: z.string(),
          create: z.string(),
          first_name: z.string(),
          last_name: z.string(),
          email: z.string(),
          national_code: z.string(),
          avatar: z.string(),
          video_accept: z.union([z.literal(0), z.literal(1)]),
          limit: z.union([z.literal(0), z.literal(1)]),
          legal: z.boolean(),
          verify: VerifySchema,
        }),
        ticket_id: z.number(),
        seen: z.union([z.literal(0), z.literal(1)]),
        status: StatusSchema,
        department: z.string(),
        fk_department_id: z.string(),
        content: z.string(),
      })
    ),
    ...PaginationSchema.shape,
  }),
  filters: z.array(FilterSchema),
});

export const TicketSchema = z.object({
  ticket: z.object({
    id: z.string(),
    date: z.object({
      created_at: DateInfoSchema,
      updated_at: DateInfoSchema,
    }),
    priority: PrioritySchema,
    fk_department: DepartmentSchema,
    fk_order_id: z.null(),
    fk_sender_id: z.number(),
    fk_agent_id: z.null(),
    lock: z.boolean(),
    seen: z.number(),
    ticket_id: z.string(),
    fk_department_id: z.number(),
    title: z.string(),
    status: StatusSchema,
    user: z.object({
      id: z.number(),
      mobile: z.string(),
      name: z.string(),
      ip: z.string(),
      create: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      national_code: z.string(),
      phone: z.nullable(z.string()),
      email: z.nullable(z.string()),
      avatar: z.string(),
      we_trust: z.number(),
      no_trust: z.number(),
      verifications: z.array(
        z.object({
          title: z.string(),
          key: z.string(),
          is_confirmed: z.boolean(),
          status: z.object({
            title: z.string(),
            key: z.string(),
          }),
        })
      ),
      status: z.number(),
      legal: z.boolean(),
      tfa_type: z.string(),
      shahkar: z.object({
        color: z.string(),
        label: z.string(),
        key: z.string(),
      }),
      balance: z.number(),
      verify: z.object({
        mobile: z.boolean(),
        email: z.boolean(),
      }),
      level: z.string(),
    }),
    user_info: UserInfoSchema,
    content: z.string(),
    replies: z.array(ReplySchema),
  }),
});

export const TicketDetailResponseSchema = z.object({
  filters: z.array(FilterSchema),
  tickets: z.object({
    data: z.array(
      z.object({
        ticket_id: z.number(),
        seen: z.union([z.literal(0), z.literal(1)]),
        status: StatusSchema,
        department: z.string(),
        fk_department_id: z.string(),
        content: z.string(),
        title: z.string(),
        date: z.object({
          created_at: DateInfoSchema,
          updated_at: DateInfoSchema,
        }),
        user: z.object({
          fk_user_id: z.number(),
          mobile: z.string(),
          name: z.string(),
          ip_address: z.string(),
          create: z.string(),
          first_name: z.string(),
          last_name: z.string(),
          email: z.string(),
          national_code: z.string(),
          avatar: z.string(),
          video_accept: z.union([z.literal(0), z.literal(1)]),
          limit: z.union([z.literal(0), z.literal(1)]),
          legal: z.boolean(),
          verify: VerifySchema,
        }),
      })
    ),
    ...PaginationSchema.shape,
  }),
});

// ==================== TYPES ====================
export type Tickets = z.infer<typeof TicketsSchema>;
export type TicketList = z.infer<typeof TicketsSchema>['tickets']['data'][number];
export type Ticket = z.infer<typeof TicketSchema>;
export type TicketItem = z.infer<typeof TicketSchema>['ticket'];
export type TicketDetailResponse = z.infer<typeof TicketDetailResponseSchema>;
export type CombinedTicket = z.infer<typeof TicketDetailResponseSchema>['tickets']['data'][number];
export type Filters = z.infer<typeof FilterSchema>;
