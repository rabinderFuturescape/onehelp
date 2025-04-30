'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Form';
import { DatePicker } from '@/components/ui/DatePicker';

interface JobCardProps {
  ticketId: string;
  ticketNumber: string;
}

interface JobCardData {
  id: string;
  handlerName: string;
  jobDetails: string;
  visitDate: Date | null;
  createdAt: Date;
}

// Mock data - in a real app, this would come from an API
const mockJobCards: JobCardData[] = [];

export const JobCardList: React.FC<JobCardProps> = ({ ticketId, ticketNumber }) => {
  const [isNewJobCardOpen, setIsNewJobCardOpen] = useState(false);
  const [jobCards, setJobCards] = useState<JobCardData[]>(mockJobCards);

  const handleAddJobCard = (jobCard: Omit<JobCardData, 'id' | 'createdAt'>) => {
    const newJobCard = {
      ...jobCard,
      id: `job-${Date.now()}`,
      createdAt: new Date(),
    };

    setJobCards([...jobCards, newJobCard]);
    setIsNewJobCardOpen(false);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Job Cards</h3>
        <Button
          onClick={() => setIsNewJobCardOpen(true)}
          variant="primary"
          size="sm"
          className="bg-blue-700 hover:bg-blue-800"
        >
          New Job Card
        </Button>
      </div>

      {jobCards.length === 0 ? (
        <p className="text-sm text-gray-500">No job cards yet.</p>
      ) : (
        <div className="space-y-4">
          {jobCards.map((jobCard) => (
            <div key={jobCard.id} className="bg-white border border-gray-200 rounded-md p-4">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{jobCard.handlerName}</h4>
                <span className="text-xs text-gray-500">
                  {jobCard.createdAt.toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{jobCard.jobDetails}</p>
              {jobCard.visitDate && (
                <div className="mt-2 text-xs text-gray-500">
                  Visit scheduled: {jobCard.visitDate.toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <NewJobCardDialog
        isOpen={isNewJobCardOpen}
        onClose={() => setIsNewJobCardOpen(false)}
        onSubmit={handleAddJobCard}
        ticketNumber={ticketNumber}
      />
    </div>
  );
};

interface NewJobCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<JobCardData, 'id' | 'createdAt'>) => void;
  ticketNumber: string;
}

const NewJobCardDialog: React.FC<NewJobCardDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  ticketNumber,
}) => {
  const [handlerName, setHandlerName] = useState('');
  const [jobDetails, setJobDetails] = useState('');
  const [visitDate, setVisitDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      handlerName,
      jobDetails,
      visitDate,
    });

    // Reset form
    setHandlerName('');
    setJobDetails('');
    setVisitDate(null);
  };

  return (
    <Dialog
      as="div"
      className="relative z-10"
      open={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ticket No:
          </label>
          <div className="text-sm text-gray-900">#{ticketNumber}</div>
        </div>

        <div>
          <label htmlFor="handlerName" className="block text-sm font-medium text-gray-700 mb-1">
            Handler Name<span className="text-red-500">*</span>
          </label>
          <Input
            id="handlerName"
            value={handlerName}
            onChange={(e) => setHandlerName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="jobDetails" className="block text-sm font-medium text-gray-700 mb-1">
            Job Details<span className="text-red-500">*</span>
          </label>
          <textarea
            id="jobDetails"
            value={jobDetails}
            onChange={(e) => setJobDetails(e.target.value)}
            rows={4}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700 mb-1">
            Visit Date<span className="text-red-500">*</span>
          </label>
          <DatePicker
            id="visitDate"
            selected={visitDate}
            onChange={setVisitDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            required
          />
        </div>

        <div className="flex justify-center space-x-3 mt-6">
          <Button
            type="submit"
            variant="success"
            className="w-24"
          >
            Save
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-24"
            onClick={onClose}
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="danger"
            className="w-24"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
