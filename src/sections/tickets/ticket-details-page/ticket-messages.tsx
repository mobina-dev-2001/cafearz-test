import type { TicketItem } from 'src/api/types';

import { useRef, useEffect } from 'react';

import { Box, Stack, Avatar, Typography } from '@mui/material';

export const ConversationMessages = ({ ticket }: { ticket: TicketItem }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticket.replies]);

  return (
    ticket.replies.length > 0 && (
      <Stack spacing={1.5} mx={9.25} my={3.5} sx={{ maxHeight: 388, overflowY: 'scroll', p: 1.5 }}>
        {ticket.replies.map((msg, index) => (
          <Box
            key={`${msg.date.created_at.time}-${index}`}
            sx={{
              display: 'flex',
              justifyContent: msg.user_info.is_admin ? 'end' : 'start',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gap: 2,
                p: 2,
                maxWidth: '61%',
                bgcolor: msg.user_info.is_admin ? '#E6F4FD' : '#E6F6F1',
                borderRadius: '10px',
              }}
            >
              <Stack direction="row" spacing={0.75} alignItems="center">
                <Avatar src={msg.user_info.avatar} sx={{ maxWidth: 34, height: 34 }} />
                <Typography variant="body1">{msg.user_info.name}</Typography>
              </Stack>
              <Typography variant="subtitle1" color="text.secondary">
                {msg.content}
              </Typography>
              <Typography variant="subtitle1" sx={{ justifySelf: 'end' }}>
                {msg.date.created_at.jalali}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Stack>
    )
  );
};
