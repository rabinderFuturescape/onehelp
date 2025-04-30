'use client';

import React, { useState } from 'react';
import { Ticket, TicketInput, STATUS_OPTIONS, PRIORITY_OPTIONS } from '@/types/tickets';
import { useUpdateTicket } from '@/hooks/useTickets.mock';
import { useRoles } from '@/hooks/useRoles.mock';
import { useCannedResponses } from '@/hooks/useCannedResponses.mock';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Form';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { useAuthStore } from '@/store/authStore';
import { TabPanel } from '@/components/ui/TabPanel';
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface TicketActionsProps {
  ticket: Ticket;
  onTicketUpdated?: () => void;
}

export const TicketActions: React.FC<TicketActionsProps> = ({
  ticket,
  onTicketUpdated
}) => {
  const { user } = useAuthStore();
  const updateMutation = useUpdateTicket();
  const { data: roles = [] } = useRoles();
  const { data: cannedResponses = [] } = useCannedResponses();

  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isPriorityDialogOpen, setIsPriorityDialogOpen] = useState(false);
  const [isCannedResponseDialogOpen, setIsCannedResponseDialogOpen] = useState(false);

  const [selectedAssignee, setSelectedAssignee] = useState(ticket.assignedToId || '');
  const [selectedStatus, setSelectedStatus] = useState(ticket.status);
  const [selectedPriority, setSelectedPriority] = useState(ticket.priority);
  const [selectedCannedResponse, setSelectedCannedResponse] = useState('');

  // Check if user is admin or agent
  const isAdminOrAgent = user?.role === 'admin' || user?.role === 'agent' || user?.role === 'manager';

  // Handle ticket assignment
  const handleAssign = () => {
    updateMutation.mutate(
      {
        id: ticket.id,
        ticket: { assignedToId: selectedAssignee }
      },
      {
        onSuccess: () => {
          setIsAssignDialogOpen(false);
          if (onTicketUpdated) onTicketUpdated();
        }
      }
    );
  };

  // Handle status change
  const handleStatusChange = () => {
    updateMutation.mutate(
      {
        id: ticket.id,
        ticket: { status: selectedStatus }
      },
      {
        onSuccess: () => {
          setIsStatusDialogOpen(false);
          if (onTicketUpdated) onTicketUpdated();
        }
      }
    );
  };

  // Handle priority change
  const handlePriorityChange = () => {
    updateMutation.mutate(
      {
        id: ticket.id,
        ticket: { priority: selectedPriority }
      },
      {
        onSuccess: () => {
          setIsPriorityDialogOpen(false);
          if (onTicketUpdated) onTicketUpdated();
        }
      }
    );
  };

  // Handle using canned response
  const handleUseCannedResponse = () => {
    const response = cannedResponses.find(r => r.id === selectedCannedResponse);
    if (response) {
      // This would typically add a comment with the canned response content
      // For now, we'll just close the dialog
      setIsCannedResponseDialogOpen(false);
      setSelectedCannedResponse('');
    }
  };

  if (!isAdminOrAgent) {
    return null;
  }

  const [replyText, setReplyText] = useState('');
  const [internalNoteText, setInternalNoteText] = useState('');
  const [assignComment, setAssignComment] = useState('');

  const handlePostReply = () => {
    // In a real app, this would send the reply to the API
    console.log('Posting reply:', replyText);
    setReplyText('');
  };

  const handlePostInternalNote = () => {
    // In a real app, this would send the internal note to the API
    console.log('Posting internal note:', internalNoteText);
    setInternalNoteText('');
  };

  return (
    <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
      <TabPanel
        tabs={[
          { id: 'reply', label: 'Post Reply', icon: <PaperAirplaneIcon className="h-4 w-4" /> },
          { id: 'internal', label: 'Post Internal Note', icon: <ChatBubbleLeftRightIcon className="h-4 w-4" /> },
          { id: 'assign', label: 'Assign Issue', icon: <UserGroupIcon className="h-4 w-4" /> },
        ]}
        defaultTabId="reply"
        contentClassName="p-4"
      >
        {/* Post Reply Tab */}
        <div className="space-y-4">
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
              To <span className="text-red-500">*</span>
            </label>
            <Select
              id="to"
              value={ticket.member.id}
              disabled
              className="w-full"
            >
              <option value={ticket.member.id}>{ticket.member.name}</option>
            </Select>
          </div>

          <div>
            <label htmlFor="cannedResponse" className="block text-sm font-medium text-gray-700 mb-1">
              Canned Response <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <Select
              id="cannedResponse"
              value={selectedCannedResponse}
              onChange={(e) => setSelectedCannedResponse(e.target.value)}
              className="w-full"
            >
              <option value="">Select a response</option>
              {cannedResponses.map((response) => (
                <option key={response.id} value={response.id}>
                  {response.title}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <div className="border border-gray-300 rounded-md">
              <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex items-center">
                <span className="text-sm text-gray-700 mr-2">Normal</span>
                <div className="flex space-x-1">
                  <button className="p-1 text-sm hover:bg-gray-200 rounded">B</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded italic">I</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded underline">U</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded">•</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded">1.</button>
                </div>
              </div>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={5}
                className="border-0 focus:ring-0 w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <Select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="primary"
              className="flex items-center"
              onClick={handlePostReply}
            >
              <PaperAirplaneIcon className="h-4 w-4 mr-1" />
              Post Reply
            </Button>
            <Button variant="secondary">Reset</Button>
          </div>
        </div>

        {/* Internal Note Tab */}
        <div className="space-y-4">
          <div>
            <div className="border border-gray-300 rounded-md">
              <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex items-center">
                <span className="text-sm text-gray-700 mr-2">Normal</span>
                <div className="flex space-x-1">
                  <button className="p-1 text-sm hover:bg-gray-200 rounded">B</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded italic">I</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded underline">U</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded">•</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded">1.</button>
                </div>
              </div>
              <textarea
                value={internalNoteText}
                onChange={(e) => setInternalNoteText(e.target.value)}
                rows={5}
                className="border-0 focus:ring-0 w-full"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="success"
              className="flex items-center"
              onClick={handlePostInternalNote}
            >
              Save Note
            </Button>
            <Button variant="secondary">Reset</Button>
          </div>
        </div>

        {/* Assign Issue Tab */}
        <div className="space-y-4">
          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
              Assignee <span className="text-red-500">*</span>
            </label>
            <Select
              id="assignee"
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="w-full"
            >
              <option value="">Unassigned</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="assignComment" className="block text-sm font-medium text-gray-700 mb-1">
              Comment <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 rounded-md">
              <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex items-center">
                <span className="text-sm text-gray-700 mr-2">Normal</span>
                <div className="flex space-x-1">
                  <button className="p-1 text-sm hover:bg-gray-200 rounded">B</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded italic">I</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded underline">U</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded">•</button>
                  <button className="p-1 text-sm hover:bg-gray-200 rounded">1.</button>
                </div>
              </div>
              <textarea
                value={assignComment}
                onChange={(e) => setAssignComment(e.target.value)}
                rows={5}
                className="border-0 focus:ring-0 w-full"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="success"
              className="flex items-center"
              onClick={handleAssign}
            >
              Assign
            </Button>
            <Button variant="secondary">Reset</Button>
          </div>
        </div>
      </TabPanel>

      {/* Assign Dialog */}
      <Dialog
        as="div"
        className="relative z-10"
        open={isAssignDialogOpen}
        onClose={() => setIsAssignDialogOpen(false)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Assign Ticket</DialogTitle>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">
                Assign to
              </label>
              <Select
                id="assignee"
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="mt-1"
              >
                <option value="">Unassigned</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsAssignDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAssign}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? 'Assigning...' : 'Assign'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Dialog */}
      <Dialog
        as="div"
        className="relative z-10"
        open={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Change Status</DialogTitle>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-1"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsStatusDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleStatusChange}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? 'Updating...' : 'Update Status'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Priority Dialog */}
      <Dialog
        as="div"
        className="relative z-10"
        open={isPriorityDialogOpen}
        onClose={() => setIsPriorityDialogOpen(false)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Change Priority</DialogTitle>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <Select
                id="priority"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="mt-1"
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsPriorityDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePriorityChange}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? 'Updating...' : 'Update Priority'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Canned Response Dialog */}
      <Dialog
        as="div"
        className="relative z-10"
        open={isCannedResponseDialogOpen}
        onClose={() => setIsCannedResponseDialogOpen(false)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Use Canned Response</DialogTitle>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="cannedResponse" className="block text-sm font-medium text-gray-700">
                Select Response
              </label>
              <Select
                id="cannedResponse"
                value={selectedCannedResponse}
                onChange={(e) => setSelectedCannedResponse(e.target.value)}
                className="mt-1"
              >
                <option value="">Select a response</option>
                {cannedResponses.map((response) => (
                  <option key={response.id} value={response.id}>
                    {response.title}
                  </option>
                ))}
              </Select>
            </div>

            {selectedCannedResponse && (
              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-700">Preview:</h4>
                <div
                  className="mt-1 p-3 bg-gray-50 rounded-md text-sm text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: cannedResponses.find(r => r.id === selectedCannedResponse)?.emailResponse || ''
                  }}
                />
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsCannedResponseDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUseCannedResponse}
                disabled={!selectedCannedResponse}
              >
                Use Response
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
