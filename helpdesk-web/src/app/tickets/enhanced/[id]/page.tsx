'use client';

import React from 'react';
import { EnhancedTicketDetail } from '@/components/tickets/EnhancedTicketDetail';

export default function EnhancedTicketDetailPage({ params }: { params: { id: string } }) {
  return <EnhancedTicketDetail />;
}
