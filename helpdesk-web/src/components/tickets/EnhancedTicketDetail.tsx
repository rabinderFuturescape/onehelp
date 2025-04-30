'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/shared';
import { TabPanel } from '@/components/ui/TabPanel';
import { JobCardList } from '@/components/tickets/JobCard';
import { CannedResponse } from '@/components/tickets/CannedResponse';
import { TicketCommunication } from '@/components/tickets/TicketCommunication';
import { Select, Input } from '@/components/ui/Form';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import {
  PencilIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Mock data for demonstration
const mockTicket = {
  id: '1',
  ticketNumber: '921368',
  subject: 'general issue',
  status: 'open',
  priority: 'normal',
  helpTopic: { id: '1', name: 'Gas complaints Test' },
  createdAt: new Date('2025-03-18'),
  dueDate: new Date('2025-03-25'),
  isOverdue: true,
  isEscalated: false,
  description: 'This is a general issue that needs to be addressed.',
  member: {
    id: '601',
    name: 'Shweta Danawale',
    email: 'shweta.danawale@futurescapetech.com',
    phone: '917208444884',
    unitNumber: null
  },
  assignedTo: {
    id: '1',
    name: 'Rahul N'
  },
  attachments: []
};

const mockCommunicationItems = [
  {
    id: '1',
    type: 'system' as const,
    content: 'general issue',
    date: new Date('2025-03-18'),
    isOverdue: false
  },
  {
    id: '2',
    type: 'system' as const,
    content: '',
    date: new Date('2025-03-20'),
    isOverdue: true
  }
];

export const EnhancedTicketDetail: React.FC = () => {
  const [replyText, setReplyText] = useState('');
  const [internalNoteTitle, setInternalNoteTitle] = useState('');
  const [internalNoteText, setInternalNoteText] = useState('');
  const [assignee, setAssignee] = useState('');
  const [assignComment, setAssignComment] = useState('');
  const [activeTab, setActiveTab] = useState('reply');
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('open');

  const handleCannedResponseSelect = (content: string) => {
    setReplyText(content);
  };

  const handlePostReply = () => {
    // In a real app, this would send the reply to the API
    console.log('Posting reply:', replyText);
    setReplyText('');
  };

  const handleSaveNote = () => {
    // In a real app, this would send the internal note to the API
    console.log('Saving note:', { title: internalNoteTitle, content: internalNoteText });
    setInternalNoteTitle('');
    setInternalNoteText('');
  };

  const handleAssign = () => {
    // In a real app, this would send the assignment to the API
    console.log('Assigning ticket:', { assignee, comment: assignComment });
    setAssignee('');
    setAssignComment('');
  };

  const handleStatusChange = () => {
    // In a real app, this would send the status change to the API
    console.log('Changing status to:', selectedStatus);
    setIsStatusDialogOpen(false);
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Helpdesk', href: '/helpdesk' },
            { label: 'Complaint Details' },
          ]}
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">Complaint Details</h1>
        <div className="flex space-x-2">
          <Button
            variant="primary"
            className="flex items-center"
            onClick={() => setActiveTab('reply')}
          >
            <PaperAirplaneIcon className="h-4 w-4 mr-1" />
            Post Reply
          </Button>
          <Button
            variant="secondary"
            className="flex items-center"
            onClick={() => setIsStatusDialogOpen(true)}
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Change Status
          </Button>
          <Button
            variant="secondary"
            className="flex items-center"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Ticket details and communication */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket header info */}
          <Card className="shadow-sm">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-10 w-10 bg-orange-100 text-orange-600 flex items-center justify-center rounded-md">
                    <DocumentTextIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Ticket No:</span>
                        <span className="text-sm font-medium">#{mockTicket.ticketNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">Help Topic:</span>
                        <span className="text-sm font-medium">{mockTicket.helpTopic.name}</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <PencilIcon className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      New
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="text-sm text-gray-500">Complaint Subject</div>
                  <div className="text-sm font-medium">{mockTicket.subject}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Priority</div>
                  <div className="text-sm font-medium capitalize">{mockTicket.priority}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Created Date</div>
                  <div className="text-sm font-medium">
                    {mockTicket.createdAt.toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Due Date</div>
                  <div className="text-sm font-medium">
                    {mockTicket.dueDate.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Communication history */}
          <Card className="shadow-sm">
            <div className="p-4">
              <TicketCommunication items={mockCommunicationItems} />
            </div>
          </Card>

          {/* Action tabs */}
          <Card className="shadow-sm">
            <TabPanel
              tabs={[
                { id: 'reply', label: 'Post Reply', icon: <PaperAirplaneIcon className="h-4 w-4" /> },
                { id: 'internal', label: 'Post Internal Note', icon: <ChatBubbleLeftRightIcon className="h-4 w-4" /> },
                { id: 'assign', label: 'Assign Issue', icon: <UserGroupIcon className="h-4 w-4" /> },
              ]}
              defaultTabId={activeTab}
              onTabChange={(tabId) => setActiveTab(tabId)}
              contentClassName="p-4"
            >
              {/* Post Reply Tab */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                    To <span className="text-red-500">*</span>
                  </label>
                  <Select id="to" value="shweta.danawale" disabled>
                    <option value="shweta.danawale">Shweta Danawale</option>
                  </Select>
                </div>

                <CannedResponse onSelect={handleCannedResponseSelect} />

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
                  <Select id="status" defaultValue="open">
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
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
                  <label htmlFor="internalNoteTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Internal Note Title
                  </label>
                  <Input
                    id="internalNoteTitle"
                    value={internalNoteTitle}
                    onChange={(e) => setInternalNoteTitle(e.target.value)}
                  />
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
                    onClick={handleSaveNote}
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
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    required
                  >
                    <option value="">Select an assignee</option>
                    <option value="mahesh">Mahesh Chaurasiya (TowerA-103)</option>
                    <option value="rahul">Rahul N</option>
                    <option value="admin">Admin User</option>
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
                      required
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
          </Card>
        </div>

        {/* Right column - Member details and job cards */}
        <div className="space-y-6">
          {/* Member details */}
          <Card title="Member Details" className="shadow-sm">
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-medium text-gray-500">
                    {mockTicket.member.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{mockTicket.member.name}</h3>
                  <p className="text-sm text-gray-500">({mockTicket.member.id})</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Email Id</div>
                  <div className="text-sm">{mockTicket.member.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone No</div>
                  <div className="text-sm">{mockTicket.member.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Assign To</div>
                  <div className="text-sm">{mockTicket.assignedTo?.name || 'Unassigned'}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Job Cards */}
          <Card className="shadow-sm">
            <div className="p-4">
              <JobCardList ticketId={mockTicket.id} ticketNumber={mockTicket.ticketNumber} />
            </div>
          </Card>
        </div>
      </div>

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
              <label htmlFor="statusChange" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                id="statusChange"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-1"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
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
              >
                Update Status
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
