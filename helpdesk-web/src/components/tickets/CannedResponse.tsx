'use client';

import React, { useState, useEffect } from 'react';
import { Select } from '@/components/ui/Form';

interface CannedResponseOption {
  id: string;
  title: string;
  content: string;
}

interface CannedResponseProps {
  onSelect: (content: string) => void;
}

// Mock data - in a real app, this would come from an API
const mockCannedResponses: CannedResponseOption[] = [
  {
    id: '1',
    title: 'Greeting',
    content: 'Hello, thank you for contacting our support team. We appreciate your patience.'
  },
  {
    id: '2',
    title: 'Closing',
    content: 'If you have any further questions, please don\'t hesitate to contact us. We\'re here to help!'
  },
  {
    id: '3',
    title: 'In Progress',
    content: 'We are currently working on your issue and will update you as soon as we have more information.'
  },
  {
    id: '4',
    title: 'Request More Information',
    content: 'To better assist you, we need some additional information. Could you please provide more details about the issue you\'re experiencing?'
  }
];

export const CannedResponse: React.FC<CannedResponseProps> = ({ onSelect }) => {
  const [selectedResponseId, setSelectedResponseId] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedResponseId(e.target.value);
  };

  useEffect(() => {
    if (selectedResponseId) {
      const selectedResponse = mockCannedResponses.find(r => r.id === selectedResponseId);
      if (selectedResponse) {
        onSelect(selectedResponse.content);
      }
    }
  }, [selectedResponseId, onSelect]);

  return (
    <div>
      <label htmlFor="cannedResponse" className="block text-sm font-medium text-gray-700 mb-1">
        Canned Response <span className="text-gray-400 text-xs">(optional)</span>
      </label>
      <Select
        id="cannedResponse"
        value={selectedResponseId}
        onChange={handleChange}
        className="w-full"
      >
        <option value="">Select a canned response</option>
        {mockCannedResponses.map((response) => (
          <option key={response.id} value={response.id}>
            {response.title}
          </option>
        ))}
      </Select>
    </div>
  );
};
