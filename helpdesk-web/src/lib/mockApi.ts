import {
  mockHelpTopics,
  mockCannedResponses,
  mockComplaints,
  mockRoles,
  mockEscalationRules,
  mockReport,
  mockMembers,
  mockTickets,
} from './mockData';
import { HelpTopic, HelpTopicInput } from '@/types/help-topics';
import { CannedResponse, CannedResponseInput } from '@/types/canned-responses';
import { Complaint, ComplaintInput, Member } from '@/types/complaints';
import { EscalationRule, EscalationRuleInput } from '@/types/escalation';
import { ReportFilters, ReportResponse } from '@/types/reports';
import { Ticket, TicketInput } from '@/types/tickets';

// Helper function to generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Helper function to delay responses to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
const mockApi = {
  // Help Topics
  getHelpTopics: async (): Promise<HelpTopic[]> => {
    await delay(500);
    return [...mockHelpTopics];
  },

  getHelpTopic: async (id: string): Promise<HelpTopic> => {
    await delay(300);
    const topic = mockHelpTopics.find(t => t.id === id);
    if (!topic) {
      throw new Error('Help topic not found');
    }
    return { ...topic };
  },

  createHelpTopic: async (topic: HelpTopicInput): Promise<HelpTopic> => {
    await delay(700);
    const newTopic: HelpTopic = {
      ...topic,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parent: topic.parentId ? mockHelpTopics.find(t => t.id === topic.parentId) : null,
      autoAssignRole: topic.autoAssignRoleId ? mockRoles.find(r => r.id === topic.autoAssignRoleId) : null,
    };
    mockHelpTopics.push(newTopic);
    return { ...newTopic };
  },

  updateHelpTopic: async (id: string, topic: Partial<HelpTopicInput>): Promise<HelpTopic> => {
    await delay(700);
    const index = mockHelpTopics.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Help topic not found');
    }

    const updatedTopic = {
      ...mockHelpTopics[index],
      ...topic,
      updatedAt: new Date().toISOString(),
      parent: topic.parentId ? mockHelpTopics.find(t => t.id === topic.parentId) : mockHelpTopics[index].parent,
      autoAssignRole: topic.autoAssignRoleId ? mockRoles.find(r => r.id === topic.autoAssignRoleId) : mockHelpTopics[index].autoAssignRole,
    };

    mockHelpTopics[index] = updatedTopic;
    return { ...updatedTopic };
  },

  deleteHelpTopic: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockHelpTopics.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Help topic not found');
    }
    mockHelpTopics.splice(index, 1);
  },

  // Canned Responses
  getCannedResponses: async (): Promise<CannedResponse[]> => {
    await delay(500);
    return [...mockCannedResponses];
  },

  getCannedResponse: async (id: string): Promise<CannedResponse> => {
    await delay(300);
    const response = mockCannedResponses.find(r => r.id === id);
    if (!response) {
      throw new Error('Canned response not found');
    }
    return { ...response };
  },

  createCannedResponse: async (response: CannedResponseInput): Promise<CannedResponse> => {
    await delay(700);
    const newResponse: CannedResponse = {
      ...response,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCannedResponses.push(newResponse);
    return { ...newResponse };
  },

  updateCannedResponse: async (id: string, response: Partial<CannedResponseInput>): Promise<CannedResponse> => {
    await delay(700);
    const index = mockCannedResponses.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Canned response not found');
    }

    const updatedResponse = {
      ...mockCannedResponses[index],
      ...response,
      updatedAt: new Date().toISOString(),
    };

    mockCannedResponses[index] = updatedResponse;
    return { ...updatedResponse };
  },

  deleteCannedResponse: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockCannedResponses.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Canned response not found');
    }
    mockCannedResponses.splice(index, 1);
  },

  // Complaints
  getComplaints: async (filters?: any): Promise<Complaint[]> => {
    await delay(700);
    let filteredComplaints = [...mockComplaints];

    if (filters) {
      if (filters.status) {
        filteredComplaints = filteredComplaints.filter(c => c.status === filters.status);
      }
      if (filters.priority) {
        filteredComplaints = filteredComplaints.filter(c => c.priority === filters.priority);
      }
      if (filters.ticketNumber) {
        filteredComplaints = filteredComplaints.filter(c => c.ticketNumber.includes(filters.ticketNumber));
      }
      if (filters.subject) {
        filteredComplaints = filteredComplaints.filter(c => c.subject.toLowerCase().includes(filters.subject.toLowerCase()));
      }
      if (filters.helpTopicId) {
        filteredComplaints = filteredComplaints.filter(c => c.helpTopicId === filters.helpTopicId);
      }
      if (filters.assignedToId) {
        filteredComplaints = filteredComplaints.filter(c => c.assignedToId === filters.assignedToId);
      }
      if (filters.isOverdue) {
        filteredComplaints = filteredComplaints.filter(c => c.isOverdue);
      }
      if (filters.isEscalated) {
        filteredComplaints = filteredComplaints.filter(c => c.isEscalated);
      }
    }

    return filteredComplaints;
  },

  getComplaint: async (id: string): Promise<Complaint> => {
    await delay(500);
    const complaint = mockComplaints.find(c => c.id === id);
    if (!complaint) {
      throw new Error('Complaint not found');
    }
    return { ...complaint };
  },

  createComplaint: async (complaint: ComplaintInput): Promise<Complaint> => {
    await delay(1000);
    const helpTopic = mockHelpTopics.find(t => t.id === complaint.helpTopicId);
    const member = mockMembers.find(m => m.id === complaint.memberId);
    const assignedTo = complaint.assignedToId ? mockRoles.find(r => r.id === complaint.assignedToId) : null;

    if (!helpTopic || !member) {
      throw new Error('Invalid help topic or member');
    }

    const newComplaint: Complaint = {
      ...complaint,
      id: generateId(),
      ticketNumber: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      helpTopic: { id: helpTopic.id, name: helpTopic.name },
      member,
      assignedTo: assignedTo ? { id: assignedTo.id, name: assignedTo.name, email: 'agent@example.com' } : null,
      dueDate: new Date(Date.now() + helpTopic.dueHours * 60 * 60 * 1000).toISOString(),
      isOverdue: false,
      isEscalated: false,
      attachments: complaint.attachments || [],
    };

    mockComplaints.push(newComplaint);
    return { ...newComplaint };
  },

  updateComplaint: async (id: string, complaint: Partial<ComplaintInput>): Promise<Complaint> => {
    await delay(800);
    const index = mockComplaints.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Complaint not found');
    }

    const helpTopic = complaint.helpTopicId ?
      mockHelpTopics.find(t => t.id === complaint.helpTopicId) :
      mockHelpTopics.find(t => t.id === mockComplaints[index].helpTopicId);

    const assignedTo = complaint.assignedToId ?
      mockRoles.find(r => r.id === complaint.assignedToId) :
      mockComplaints[index].assignedTo;

    if (complaint.helpTopicId && !helpTopic) {
      throw new Error('Invalid help topic');
    }

    const updatedComplaint = {
      ...mockComplaints[index],
      ...complaint,
      updatedAt: new Date().toISOString(),
      helpTopic: helpTopic ? { id: helpTopic.id, name: helpTopic.name } : mockComplaints[index].helpTopic,
      assignedTo: assignedTo,
    };

    mockComplaints[index] = updatedComplaint;
    return { ...updatedComplaint };
  },

  deleteComplaint: async (id: string): Promise<void> => {
    await delay(600);
    const index = mockComplaints.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Complaint not found');
    }
    mockComplaints.splice(index, 1);
  },

  // Members
  searchMembers: async (query: string): Promise<Member[]> => {
    await delay(400);
    if (!query || query.length < 3) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    return mockMembers.filter(m =>
      m.name.toLowerCase().includes(lowerQuery) ||
      (m.email && m.email.toLowerCase().includes(lowerQuery)) ||
      (m.phone && m.phone.includes(query)) ||
      (m.unitNumber && m.unitNumber.toLowerCase().includes(lowerQuery))
    );
  },

  // Roles
  getRoles: async () => {
    await delay(300);
    return [...mockRoles];
  },

  // Escalation Rules
  getEscalationRules: async () => {
    await delay(500);
    return [...mockEscalationRules];
  },

  getEscalationRule: async (id: string) => {
    await delay(300);
    const rule = mockEscalationRules.find(r => r.id === id);
    if (!rule) {
      throw new Error('Escalation rule not found');
    }
    return { ...rule };
  },

  createEscalationRule: async (rule: EscalationRuleInput): Promise<EscalationRule> => {
    await delay(700);
    const newRule: EscalationRule = {
      ...rule,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockEscalationRules.push(newRule);
    return { ...newRule };
  },

  updateEscalationRule: async (id: string, rule: Partial<EscalationRuleInput>): Promise<EscalationRule> => {
    await delay(700);
    const index = mockEscalationRules.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Escalation rule not found');
    }

    const updatedRule = {
      ...mockEscalationRules[index],
      ...rule,
      updatedAt: new Date().toISOString(),
    };

    mockEscalationRules[index] = updatedRule;
    return { ...updatedRule };
  },

  deleteEscalationRule: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockEscalationRules.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Escalation rule not found');
    }
    mockEscalationRules.splice(index, 1);
  },

  // Reports
  getComplaintsReport: async (filters?: ReportFilters): Promise<ReportResponse> => {
    await delay(800);
    let filteredComplaints = [...mockComplaints];

    if (filters) {
      if (filters.ticketNumber) {
        filteredComplaints = filteredComplaints.filter(c => c.ticketNumber.includes(filters.ticketNumber));
      }
      if (filters.isOverdue) {
        filteredComplaints = filteredComplaints.filter(c => c.isOverdue);
      }
      if (filters.isEscalated) {
        filteredComplaints = filteredComplaints.filter(c => c.isEscalated);
      }
    }

    return {
      complaints: filteredComplaints,
      summary: {
        total: filteredComplaints.length,
        open: filteredComplaints.filter(c => c.status === 'open').length,
        inProgress: filteredComplaints.filter(c => c.status === 'in_progress').length,
        resolved: filteredComplaints.filter(c => c.status === 'resolved').length,
        closed: filteredComplaints.filter(c => c.status === 'closed').length,
        reopened: filteredComplaints.filter(c => c.status === 'reopened').length,
        overdue: filteredComplaints.filter(c => c.isOverdue).length,
        escalated: filteredComplaints.filter(c => c.isEscalated).length,
      },
    };
  },

  exportComplaintsReport: async (filters?: ReportFilters, format: string = 'csv'): Promise<Blob> => {
    await delay(1000);
    // Create a simple CSV or PDF blob
    const content = 'Ticket Number,Subject,Status,Priority,Created At\n' +
      mockComplaints.map(c => `${c.ticketNumber},"${c.subject}",${c.status},${c.priority},${c.createdAt}`).join('\n');

    return new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/pdf' });
  },

  // Tickets
  getTickets: async (filters?: any): Promise<Ticket[]> => {
    await delay(700);
    let filteredTickets = [...mockTickets];

    if (filters) {
      if (filters.status) {
        filteredTickets = filteredTickets.filter(t => t.status === filters.status);
      }
      if (filters.priority) {
        filteredTickets = filteredTickets.filter(t => t.priority === filters.priority);
      }
      if (filters.ticketNumber) {
        filteredTickets = filteredTickets.filter(t => t.ticketNumber.includes(filters.ticketNumber));
      }
      if (filters.subject) {
        filteredTickets = filteredTickets.filter(t => t.subject.toLowerCase().includes(filters.subject.toLowerCase()));
      }
      if (filters.helpTopicId) {
        filteredTickets = filteredTickets.filter(t => t.helpTopicId === filters.helpTopicId);
      }
      if (filters.assignedToId) {
        filteredTickets = filteredTickets.filter(t => t.assignedToId === filters.assignedToId);
      }
      if (filters.isOverdue) {
        filteredTickets = filteredTickets.filter(t => t.isOverdue);
      }
      if (filters.isEscalated) {
        filteredTickets = filteredTickets.filter(t => t.isEscalated);
      }
    }

    return filteredTickets;
  },

  getTicket: async (id: string): Promise<Ticket> => {
    await delay(500);
    const ticket = mockTickets.find(t => t.id === id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    return { ...ticket };
  },

  createTicket: async (ticket: TicketInput): Promise<Ticket> => {
    await delay(1000);
    const helpTopic = mockHelpTopics.find(t => t.id === ticket.helpTopicId);
    const member = mockMembers.find(m => m.id === ticket.memberId);
    const assignedTo = ticket.assignedToId ? mockRoles.find(r => r.id === ticket.assignedToId) : null;

    if (!helpTopic || !member) {
      throw new Error('Invalid help topic or member');
    }

    const newTicket: Ticket = {
      ...ticket,
      id: generateId(),
      ticketNumber: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      helpTopic: { id: helpTopic.id, name: helpTopic.name },
      member,
      assignedTo: assignedTo ? { id: assignedTo.id, name: assignedTo.name, email: 'agent@example.com' } : null,
      dueDate: new Date(Date.now() + helpTopic.dueHours * 60 * 60 * 1000).toISOString(),
      isOverdue: false,
      isEscalated: false,
      attachments: ticket.attachments || [],
    };

    mockTickets.push(newTicket);
    return { ...newTicket };
  },

  updateTicket: async (id: string, ticket: Partial<TicketInput>): Promise<Ticket> => {
    await delay(800);
    const index = mockTickets.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Ticket not found');
    }

    const helpTopic = ticket.helpTopicId ?
      mockHelpTopics.find(t => t.id === ticket.helpTopicId) :
      mockHelpTopics.find(t => t.id === mockTickets[index].helpTopicId);

    const assignedTo = ticket.assignedToId ?
      mockRoles.find(r => r.id === ticket.assignedToId) :
      mockTickets[index].assignedTo;

    if (ticket.helpTopicId && !helpTopic) {
      throw new Error('Invalid help topic');
    }

    const updatedTicket = {
      ...mockTickets[index],
      ...ticket,
      updatedAt: new Date().toISOString(),
      helpTopic: helpTopic ? { id: helpTopic.id, name: helpTopic.name } : mockTickets[index].helpTopic,
      assignedTo: assignedTo,
    };

    mockTickets[index] = updatedTicket;
    return { ...updatedTicket };
  },

  deleteTicket: async (id: string): Promise<void> => {
    await delay(600);
    const index = mockTickets.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Ticket not found');
    }
    mockTickets.splice(index, 1);
  },
};

export default mockApi;
