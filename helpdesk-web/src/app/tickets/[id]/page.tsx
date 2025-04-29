'use client';

import { useParams } from 'next/navigation';
import TicketDetailClient from '@/components/ticket/TicketDetailClient';

export default function TicketDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id as string;

  return <TicketDetailClient id={id} />;
}